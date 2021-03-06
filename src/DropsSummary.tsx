import { Typography } from '@material-ui/core'
import * as React from 'react'

import Weekday from './interfaces/Weekday'

interface Props {
    earliestDropStartTime: string,
    latestDropStartTime: string,
    earliestDropEndTime: string,
    latestDropEndTime: string,
    averageEarliestDropStartTime: string,
    minDropLength: number,
    maxDropLength: number,
    averageDropLength: number,
    minDropDiff: number,
    maxDropDiff: number,
    averageDropDiff: number,
    weekdayBreakdown: Weekday[],
    minSameDayDrops: number,
    maxSameDayDrops: number,
    averageSameDayDrops: number,
    minSameDayDiff: number,
    maxSameDayDiff: number,
    averageSameDayDiff: number
}

export default (summary: Props) => <React.Fragment>
    <Typography variant="h3">Drop Timing</Typography>
    <Typography variant="body1">
        Based on past data, the earliest a drop will start is <strong>{summary.earliestDropStartTime}</strong> and
        the latest a drop will end is <strong>{summary.latestDropEndTime}</strong>.
        Drops last <strong>{summary.minDropLength} - {summary.maxDropLength} minutes</strong>{' '}
        (on average, <strong>{summary.averageDropLength} minutes</strong>).
    </Typography>

    <Typography variant="h3">Days Between Drops</Typography>
    <Typography variant="body1">
        There are <strong>{summary.minDropDiff} - {summary.maxDropDiff} days</strong>{' '}
        (on average, <strong>{summary.averageDropDiff} days</strong>) between each drop.
    </Typography>

    <Typography variant="h3">Weekdays</Typography>
    <Typography variant="body1">
        A drop can occur on the following weekdays:{' '}
        {
            summary.weekdayBreakdown
                .filter(weekday => weekday.count > 0)
                .sort((a, b) => b.percentage - a.percentage)
                .map((weekday, i, days) => <React.Fragment>
                    <strong>{weekday.name} ({weekday.percentage * 100}%)</strong>
                    {i == (days.length - 2) ? ', and ' : i == (days.length - 1) ? '' : ', '}</React.Fragment>)
        }
    </Typography>

    <Typography variant="h3">Same Day Drops</Typography>
    <Typography variant="body1">
        On a given day, there can be <strong>{summary.minSameDayDrops} - {summary.maxSameDayDrops} drops</strong>{' '}
        (on average, <strong>{summary.averageSameDayDrops} drops</strong>), with a span of{' '}
        <strong>{summary.minSameDayDiff} - {summary.maxSameDayDiff} minutes</strong>{' '}
        (on average, <strong>{summary.averageSameDayDiff} minutes</strong>) between each drop.
    </Typography>
</React.Fragment>
