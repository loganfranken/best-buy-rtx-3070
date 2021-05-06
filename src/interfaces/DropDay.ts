import Drop from './Drop'

export default interface DropDay {
    drops: Drop[],
    date: string,
    weekday: string,
    daysSinceLastDrop: number
}