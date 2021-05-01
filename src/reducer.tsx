import { combineReducers } from 'redux'

import dropReducer from './features/drops/dropsSlice'

export default combineReducers({
    drops: dropReducer
})