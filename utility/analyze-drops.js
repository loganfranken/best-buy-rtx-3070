import fs from 'fs';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

const analysis = {};
analysis.days = JSON.parse(fs.readFileSync(process.argv.slice(2)[0]));

analysis.weekdayBreakdown = {
    sunday: { count: 0, percentage: 0 },
    monday: { count: 0, percentage: 0 },
    tuesday: { count: 0, percentage: 0 },
    wednesday: { count: 0, percentage: 0 },
    thursday: { count: 0, percentage: 0 },
    friday: { count: 0, percentage: 0 },
    saturday: { count: 0, percentage: 0 }
};

let sameDayDropTotal = 0;
analysis.minSameDayDrops = null;
analysis.maxSameDayDrops = null;

let sameDayDiffTotal = 0;
let sameDayDiffTotalCount = 0;
analysis.minSameDayDiff = null;
analysis.maxSameDayDiff = null;

let dropDiffTotal = 0;
analysis.minDropDiff = null;
analysis.maxDropDiff = null;

analysis.earliestDropTime = null;
analysis.latestDropTime = null;

let lastDay = null;
analysis.days.forEach(day => {

    const inStock = moment(day.drops[0].inStock);

    // Calculate: Date
    day.date = inStock.format('M/D/YY');

    // Calculate: Day of Week
    day.weekday = inStock.format('dddd');

    // Calculate: Day of Week Count
    analysis.weekdayBreakdown[day.weekday.toLowerCase()].count++;

    // Calculate: Same Day Drops Min/Max
    analysis.minSameDayDrops = (analysis.minSameDayDrops === null || day.drops.length < analysis.minSameDayDrops) ? day.drops.length : analysis.minSameDayDrops;
    analysis.maxSameDayDrops = (analysis.maxSameDayDrops === null || day.drops.length > analysis.maxSameDayDrops) ? day.drops.length : analysis.maxSameDayDrops;
    sameDayDropTotal += day.drops.length;

    // Calculate: Earliest/Latest Drop Times
    const normalizedInStock = inStock.clone().set({ year: 0, month: 0, date: 0 });
    analysis.earliestDropTime = (analysis.earliestDropTime === null || normalizedInStock.isBefore(analysis.earliestDropTime)) ? normalizedInStock : analysis.earliestDropTime;
    analysis.latestDropTime = (analysis.latestDropTime === null || normalizedInStock.isAfter(analysis.latestDropTime)) ? normalizedInStock : analysis.latestDropTime;

    day.daysSinceLastDrop = 0;
    if(lastDay != null)
    {
        // Calculate: Days Since Last Drop
        const currDayFirstInStock = moment(day.drops[0].inStock);
        const lastDayLastInStock = moment(lastDay.drops[lastDay.drops.length - 1].inStock);
        day.daysSinceLastDrop = currDayFirstInStock.diff(lastDayLastInStock, 'days');

        // Calculate: Days Since Last Drop Min/Max
        analysis.minDropDiff = (analysis.minDropDiff === null || day.daysSinceLastDrop < analysis.minDropDiff) ? day.daysSinceLastDrop : analysis.minDropDiff;
        analysis.maxDropDiff = (analysis.maxDropDiff === null || day.daysSinceLastDrop > analysis.maxDropDiff) ? day.daysSinceLastDrop : analysis.maxDropDiff;
        dropDiffTotal += day.daysSinceLastDrop;
    }

    lastDay = day;

    let lastDrop = null;
    day.drops.forEach(drop => {

        // Calculate: Length of Drop
        drop.dropLength = moment(drop.outOfStock).diff(drop.inStock, 'minutes');

        // Calculate: Minutes Since Last Drop
        drop.minutesSinceLastDrop = (lastDrop === null)
            ? 0
            : moment(drop.inStock).diff(lastDrop.outOfStock, 'minutes');

        // Calculate: Same Day Drops Diff Min/Max
        if(drop.minutesSinceLastDrop > 0)
        {
            analysis.minSameDayDiff = (analysis.minSameDayDiff === null || drop.minutesSinceLastDrop < analysis.minSameDayDiff) ? drop.minutesSinceLastDrop : analysis.minSameDayDiff;
            analysis.maxSameDayDiff = (analysis.maxSameDayDiff === null || drop.minutesSinceLastDrop > analysis.maxSameDayDiff) ? drop.minutesSinceLastDrop : analysis.maxSameDayDiff;
            sameDayDiffTotal += drop.minutesSinceLastDrop;
            sameDayDiffTotalCount++;
        }

        lastDrop = drop;

    });

});

// Calculate: Average Number of Same Day Drops
analysis.averageSameDayDrops = Math.round(sameDayDropTotal/analysis.days.length);

// Calculate: Average Same Day Diff
analysis.averageSameDayDiffs = Math.round(sameDayDiffTotal/sameDayDiffTotalCount);

// Calculate: Day Breakdown Percentages
for(const weekdayName in analysis.weekdayBreakdown)
{
    const weekday = analysis.weekdayBreakdown[weekdayName];
    weekday.percentage = (weekday.count/analysis.days.length);
}

// Calculate: Average Drop Diff
analysis.averageDropDiffs = Math.round(dropDiffTotal/analysis.days.length);

analysis.earliestDropTime = moment(analysis.earliestDropTime).tz('America/Los_Angeles').format("HH:mm");
analysis.latestDropTime = moment(analysis.latestDropTime).tz('America/Los_Angeles').format("HH:mm");

console.log(JSON.stringify(analysis, null, 4));