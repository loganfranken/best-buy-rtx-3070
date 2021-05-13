import fs from 'fs';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

const analysis = {};
analysis.days = JSON.parse(fs.readFileSync(process.argv.slice(2)[0]));
analysis.summary = {};

analysis.summary.weekdayBreakdown = [];
const weekdayBreakdown = {
    sunday: { name: 'Sunday', count: 0 },
    monday: { name: 'Monday', count: 0 },
    tuesday: { name: 'Tuesday', count: 0 },
    wednesday: { name: 'Wednesday', count: 0 },
    thursday: { name: 'Thursday', count: 0 },
    friday: { name: 'Friday', count: 0 },
    saturday: { name: 'Saturday', count: 0 }
};

let sameDayDropTotal = 0;
analysis.summary.minSameDayDrops = null;
analysis.summary.maxSameDayDrops = null;

let sameDayDiffTotal = 0;
let sameDayDiffTotalCount = 0;
analysis.summary.minSameDayDiff = null;
analysis.summary.maxSameDayDiff = null;

let dropDiffTotal = 0;
analysis.summary.minDropDiff = null;
analysis.summary.maxDropDiff = null;

analysis.summary.earliestDropStartTime = null;
analysis.summary.latestDropStartTime = null;

analysis.summary.earliestDropEndTime = null;
analysis.summary.latestDropEndTime = null;

let dropLengthTotal = 0;
let dropLengthTotalCount = 0;
analysis.summary.minDropLength = null;
analysis.summary.maxDropLength = null;

let lastDay = null;
analysis.days.forEach(day => {

    const inStock = moment(day.drops[0].inStock);
    const outOfStock = moment(day.drops[0].outOfStock);

    // Calculate: Date
    day.date = inStock.format('M/D/YY');

    // Calculate: Day of Week
    day.weekday = inStock.format('dddd');

    // Calculate: Day of Week Count
    weekdayBreakdown[day.weekday.toLowerCase()].count++;

    // Calculate: Same Day Drops Min/Max
    analysis.summary.minSameDayDrops = (analysis.summary.minSameDayDrops === null || day.drops.length < analysis.summary.minSameDayDrops) ? day.drops.length : analysis.summary.minSameDayDrops;
    analysis.summary.maxSameDayDrops = (analysis.summary.maxSameDayDrops === null || day.drops.length > analysis.summary.maxSameDayDrops) ? day.drops.length : analysis.summary.maxSameDayDrops;
    sameDayDropTotal += day.drops.length;

    // Calculate: Earliest/Latest Drop Times
    const minutesOfDay = (m) => m.minutes() + m.hours() * 60; // Source: https://github.com/moment/moment/issues/1199

    analysis.summary.earliestDropStartTime = (analysis.summary.earliestDropStartTime === null || minutesOfDay(inStock) < minutesOfDay(analysis.summary.earliestDropStartTime)) ? inStock : analysis.summary.earliestDropStartTime;
    analysis.summary.latestDropStartTime = (analysis.summary.latestDropStartTime === null || minutesOfDay(inStock) > minutesOfDay(analysis.summary.latestDropStartTime)) ? inStock : analysis.summary.latestDropStartTime;

    analysis.summary.earliestDropEndTime = (analysis.summary.earliestDropEndTime === null || minutesOfDay(outOfStock) < minutesOfDay(analysis.summary.earliestDropEndTime)) ? outOfStock : analysis.summary.earliestDropEndTime;
    analysis.summary.latestDropEndTime = (analysis.summary.latestDropEndTime === null || minutesOfDay(outOfStock) > minutesOfDay(analysis.summary.latestDropEndTime)) ? outOfStock : analysis.summary.latestDropEndTime;

    day.daysSinceLastDrop = 0;
    if(lastDay != null)
    {
        // Calculate: Days Since Last Drop
        const currDayFirstInStock = moment(day.drops[0].inStock).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        const lastDayLastInStock = moment(lastDay.drops[lastDay.drops.length - 1].inStock).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        day.daysSinceLastDrop = currDayFirstInStock.diff(lastDayLastInStock, 'days');

        // Calculate: Days Since Last Drop Min/Max
        analysis.summary.minDropDiff = (analysis.summary.minDropDiff === null || day.daysSinceLastDrop < analysis.summary.minDropDiff) ? day.daysSinceLastDrop : analysis.summary.minDropDiff;
        analysis.summary.maxDropDiff = (analysis.summary.maxDropDiff === null || day.daysSinceLastDrop > analysis.summary.maxDropDiff) ? day.daysSinceLastDrop : analysis.summary.maxDropDiff;
        dropDiffTotal += day.daysSinceLastDrop;
    }

    lastDay = day;

    let lastDrop = null;
    day.drops.forEach(drop => {

        // Calculate: Length of Drop
        drop.dropLength = moment(drop.outOfStock).diff(drop.inStock, 'minutes');
        analysis.summary.minDropLength = (analysis.summary.minDropLength === null || drop.dropLength < analysis.summary.minDropLength) ? drop.dropLength : analysis.summary.minDropLength;
        analysis.summary.maxDropLength = (analysis.summary.maxSameDayDiff === null || drop.dropLength > analysis.summary.maxDropLength) ? drop.dropLength : analysis.summary.maxDropLength;
        dropLengthTotal += drop.dropLength;
        dropLengthTotalCount++;

        // Calculate: Minutes Since Last Drop
        drop.minutesSinceLastDrop = (lastDrop === null)
            ? 0
            : moment(drop.inStock).diff(lastDrop.inStock, 'minutes');

        // Calculate: Same Day Drops Diff Min/Max
        if(drop.minutesSinceLastDrop > 0)
        {
            analysis.summary.minSameDayDiff = (analysis.summary.minSameDayDiff === null || drop.minutesSinceLastDrop < analysis.summary.minSameDayDiff) ? drop.minutesSinceLastDrop : analysis.summary.minSameDayDiff;
            analysis.summary.maxSameDayDiff = (analysis.summary.maxSameDayDiff === null || drop.minutesSinceLastDrop > analysis.summary.maxSameDayDiff) ? drop.minutesSinceLastDrop : analysis.summary.maxSameDayDiff;
            sameDayDiffTotal += drop.minutesSinceLastDrop;
            sameDayDiffTotalCount++;
        }

        lastDrop = drop;

    });

});

// Calculate: Average Number of Same Day Drops
analysis.summary.averageSameDayDrops = Math.round(sameDayDropTotal/analysis.days.length);

// Calculate: Average Same Day Diff
analysis.summary.averageSameDayDiff = Math.round(sameDayDiffTotal/sameDayDiffTotalCount);

// Calculate: Day Breakdown Percentages
for(const weekdayName in weekdayBreakdown)
{
    const weekday = weekdayBreakdown[weekdayName];
    analysis.summary.weekdayBreakdown.push({
        ...weekday,
        percentage: (weekday.count/analysis.days.length)
    });
}

// Calculate: Average Drop Diff
analysis.summary.averageDropDiff = Math.round(dropDiffTotal/analysis.days.length);

// Calculate: Earliest/Latest Drop Times
analysis.summary.earliestDropStartTime = moment(analysis.summary.earliestDropStartTime).tz('America/Los_Angeles').format("h:mm A");
analysis.summary.latestDropStartTime = moment(analysis.summary.latestDropStartTime).tz('America/Los_Angeles').format("h:mm A");
analysis.summary.earliestDropEndTime = moment(analysis.summary.earliestDropEndTime).tz('America/Los_Angeles').format("h:mm A");
analysis.summary.latestDropEndTime = moment(analysis.summary.latestDropEndTime).tz('America/Los_Angeles').format("h:mm A");

// Calculate: Average Drop Length
analysis.summary.averageDropLength = Math.round(dropLengthTotal/dropLengthTotalCount);

console.log(JSON.stringify(analysis, null, 4));