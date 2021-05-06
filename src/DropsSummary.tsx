import * as React from 'react'
import { Typography } from '@material-ui/core'
import Weekday from './interfaces/Weekday'

interface Props {
    earliestDropTime: string,
    latestDropTime: string,
    minDropLength: number,
    maxDropLength: number,
    averageDropLength: number,
    minDropDiff: number,
    maxDropDiff: number,
    averageDropDiff: number,
    weekdayBreakdown: Weekday[]
}

export default (summary: Props) => <React.Fragment>
    <Typography variant="h3">Drop Timing</Typography>
    <Typography variant="body1">
        The earliest a drop will start is <strong>{summary.earliestDropTime}</strong> and
        the latest a drop will end is <strong>{summary.latestDropTime}</strong>.
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

    {/* <Typography variant="h3">Same Day Drops</Typography>
    <Typography variant="body1">
        On a given day, there can be <strong>{minimumSameDayDrops} - {maximumSameDayDrops} drops</strong>
        (on average, <strong>{averageSameDayDrops} drops</strong>), with a span of
        of <strong>{minimumSameDayDiff} - {maximumSameDayDiff} minutes</strong>
        (on average, <strong>{averageSameDayDiff}</strong> minutes) between each drop.
    </Typography> */}
</React.Fragment>
