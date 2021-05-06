import * as React from 'react'
import { Typography } from '@material-ui/core'

interface Props {
    earliestDropTime: string,
    latestDropTime: string,
    minDropLength: number,
    maxDropLength: number,
    averageDropLength: number,
    minDropDiff: number,
    maxDropDiff: number,
    averageDropDiff: number
}

export default (summary: Props) => <React.Fragment>
    <Typography variant="h3">Drop Timing</Typography>
    <Typography variant="body1">
        The earliest a drop will start is <strong>{summary.earliestDropTime}</strong> and
        the latest a drop will end is <strong>{summary.latestDropTime}</strong>.
        Drops last <strong>{summary.minDropLength} - {summary.maxDropLength} minutes</strong> (on average, <strong>{summary.averageDropLength} minutes</strong>).
    </Typography>

    <Typography variant="h3">Days Between Drops</Typography>
    <Typography variant="body1">
        There are <strong>{summary.minDropDiff} - {summary.maxDropDiff} days</strong> (on average, <strong>{summary.averageDropDiff} days</strong>) between each drop.
    </Typography>

    {/* <Typography variant="h3">Weekdays</Typography>
    <Typography variant="body1">
        A drop can occur on the following weekdays:
        {
            weekdayBreakdown
                .filter(weekday => weekday.count > 0)
                .sort(weekday => weekday.percentage)
                .map(weekday => <strong>{weekday.name} ({weekday.percentage}%)</strong>)
                .join(', ')
        }
    </Typography>

    <Typography variant="h3">Same Day Drops</Typography>
    <Typography variant="body1">
        On a given day, there can be <strong>{minimumSameDayDrops} - {maximumSameDayDrops} drops</strong>
        (on average, <strong>{averageSameDayDrops} drops</strong>), with a span of
        of <strong>{minimumSameDayDiff} - {maximumSameDayDiff} minutes</strong>
        (on average, <strong>{averageSameDayDiff}</strong> minutes) between each drop.
    </Typography> */}
</React.Fragment>
