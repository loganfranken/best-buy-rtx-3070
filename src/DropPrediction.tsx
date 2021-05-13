import { Typography } from '@material-ui/core'
import * as moment from 'moment'
import * as React from 'react'

import DropsAnalysis from './interfaces/DropsAnalysis'
import Weekday from './interfaces/Weekday'

interface Props extends DropsAnalysis {}

const getPossibleWeekdays = (weekdayBreakdown: Weekday[]) => weekdayBreakdown.filter(weekday => weekday.count > 0).map(weekday => weekday.name.toLowerCase());

const predictNextPossibleDay = (analysis: DropsAnalysis) => {

    // Create a list of possible weekdays
    const possibleWeekdays = getPossibleWeekdays(analysis.summary.weekdayBreakdown);

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

const predictNextLikelyDay = (analysis: DropsAnalysis) => {

    // Create a list of possible weekdays
    const possibleWeekdays = getPossibleWeekdays(analysis.summary.weekdayBreakdown);

    // Get the latest day
    const latestDay = analysis.days[analysis.days.length - 1];

    if(typeof(latestDay) === 'undefined')
    {
        return null;
    }

    // Generate the next day based on the average drop diff
    let nextDay = moment(latestDay.drops[0].inStock).add(analysis.summary.averageDropDiff, 'days');

    return moment(nextDay).format('dddd, MMMM Do YYYY');

}

export default (analysis: Props) => <React.Fragment>
    <Typography variant="body1">
        The safest guess is that the next drop will be on <strong>{predictNextPossibleDay(analysis)}</strong> from <strong>{analysis.summary.earliestDropStartTime} - {analysis.summary.latestDropEndTime}</strong>.
    </Typography>
    <Typography variant="body1">
       But based on past data, the next drop is likely to be on <strong>{predictNextLikelyDay(analysis)}</strong>.
       It will start at <strong>{analysis.summary.averageEarliestDropStartTime}</strong>,
       and there will be <strong>{analysis.summary.averageSameDayDrops} drops</strong>,
       lasting <strong>{analysis.summary.averageDropLength} minutes</strong> each.
    </Typography>
</React.Fragment>
