import Weekday from './Weekday'

export default interface DropsSummary {
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