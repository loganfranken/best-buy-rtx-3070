import fs from 'fs';
import moment from 'moment';

const analysis = JSON.parse(fs.readFileSync('data/drops-analysis.json'));

// Create a list of possible weekdays
const possibleWeekdays = [];
for(const weekdayName in analysis.weekdayBreakdown)
{
    const weekday = analysis.weekdayBreakdown[weekdayName];
    if(weekday.count > 0)
    {
        possibleWeekdays.push(weekdayName);
    }
}

// Get the latest day
const latestDay = analysis.days[analysis.days.length - 1];

// Generate the next day based on the minimum drop diff
let nextDay = moment(latestDay.drops[0].inStock).add(analysis.minDropDiff, 'days');

// Let's make sure the next day is actually matched to a weekday that's probable
while(true)
{
    const weekday = nextDay.format('dddd').toLowerCase();

    if(possibleWeekdays.includes(weekday))
    {
        break;
    }

    nextDay = nextDay.add(1, 'days');
}

console.log(`The next drop might be on ${nextDay.format('dddd, MMM DD')} from ${analysis.earliestDropTime} - ${analysis.latestDropTime}`);
