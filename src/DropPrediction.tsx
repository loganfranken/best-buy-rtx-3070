interface Props {
}

const predictNextDay = (analysis) => {

    // Create a list of possible weekdays
    const possibleWeekdays = analysis.summary.weekdayBreakdown.filter(weekday => weekday.count > 0).map(weekday => weekday.name.toLowerCase());

    // Get the latest day
    const latestDay = analysis.days[analysis.days.length - 1];

    // Generate the next day based on the minimum drop diff
    let nextDay = moment(latestDay.drops[0].inStock).add(analysis.summary.minDropDiff, 'days');

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

    return nextDay;

    console.log(`The next drop might be on ${nextDay.format('dddd, MMM DD')} from ${analysis.earliestDropTime} - ${analysis.latestDropTime}`);

}

export default (summary: Props) => <React.Fragment>
</React.Fragment>
