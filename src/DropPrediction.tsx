import { Typography } from '@material-ui/core'
import * as moment from 'moment'
import * as React from 'react'

import DropsAnalysis from './interfaces/DropsAnalysis'

interface Props extends DropsAnalysis {}

const predictNextDay = (analysis: DropsAnalysis) => {

    // Create a list of possible weekdays
    const possibleWeekdays = analysis.summary.weekdayBreakdown.filter(weekday => weekday.count > 0).map(weekday => weekday.name.toLowerCase());

    // Get the latest day
    const latestDay = analysis.days[analysis.days.length - 1];

    if(typeof(latestDay) === 'undefined')
    {
        return null;
    }

    // Generate the next day based on the minimum drop diff
    let nextDay = moment(latestDay.drops[0].inStock).add(analysis.summary.minDropDiff, 'days');

    // Let's make sure the next day is actually matched to a weekday that's probable
    while(true)
    {
        const weekday = nextDay.format('dddd').toLowerCase();

        if(possibleWeekdays.includes(weekday) && moment().isBefore(nextDay))
        {
            break;
        }

        nextDay = nextDay.add(1, 'days');
    }

    return moment(nextDay).format('dddd, MMMM Do YYYY');

}

export default (analysis: Props) => <React.Fragment>
    <Typography variant="body1">
        <strong>The next drop might be on {predictNextDay(analysis)} from {analysis.summary.earliestDropTime} - {analysis.summary.latestDropTime}</strong>.
    </Typography>
</React.Fragment>
