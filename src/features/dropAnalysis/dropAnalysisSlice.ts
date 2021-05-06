import ApplicationAction from '../../interfaces/ApplicationAction'

const initialState = {
    days: [],
    summary: {
        earliestDropTime: '',
        latestDropTime: '',
        minDropLength: 0,
        maxDropLength: 0,
        averageDropLength: 0,
        minDropDiff: 0,
        maxDropDiff: 0,
        weekdayBreakdown: []
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