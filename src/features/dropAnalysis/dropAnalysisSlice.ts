import ApplicationAction from '../../interfaces/ApplicationAction'

const initialState = {
    days: [],
    minSameDayDrops: 0,
    maxSameDayDrops: 0,
    minSameDayDiff: 0,
    maxSameDayDiff: 0,
    minDropDiff: 0,
    maxDropDiff: 0,
    earliestDropTime: '',
    latestDropTime: '',
    averageSameDayDrops: 0,
    averageSameDayDiffs: 0,
    averageDropDiffs: 0
}

export default function dropAnalysisReducer(state = initialState, action: ApplicationAction)
{
    switch(action.type)
    {
        case 'dropAnalysis/changed':
            return action.payload;

        default:
            return state;
    }
}