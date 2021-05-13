import Weekday from './Weekday'

export default interface DropsSummary {
    earliestDropStartTime: string,
    latestDropStartTime: string,
    earliestDropEndTime: string,
    latestDropEndTime: string,
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