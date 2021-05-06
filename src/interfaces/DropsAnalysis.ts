import DropDay from './DropDay'
import DropsSummary from './DropsSummary'

export default interface DropsAnalysis {
    days: DropDay[]
    summary: DropsSummary
}