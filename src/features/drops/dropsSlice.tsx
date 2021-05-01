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

interface Action {
    type: string,
    payload: object
}

export default function dropReducer(state = initialState, action: Action)
{
    switch(action.type)
    {
        case 'drops/changed':
            return action.payload;

        default:
            return state;
    }
}