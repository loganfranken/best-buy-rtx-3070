import ApplicationAction from '../../interfaces/ApplicationAction'

const initialState = {
    days: [],
    summary: {
        earliestDropStartTime: '',
        latestDropStartTime: '',
        earliestDropEndTime: '',
        latestDropEndTime: '',
        averageEarliestDropStartTime: '',
        minDropLength: 0,
        maxDropLength: 0,
        averageDropLength: 0,
        minDropDiff: 0,
        maxDropDiff: 0,
        weekdayBreakdown: [],
        minSameDayDrops: 0,
        maxSameDayDrops: 0,
        averageSameDayDrops: 0,
        minSameDayDiff: 0,
        maxSameDayDiff: 0,
        averageSameDayDiff: 0
    }
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