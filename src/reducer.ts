import { combineReducers } from 'redux'

import dropAnalysisReducer from './features/dropAnalysis/dropAnalysisSlice'

export default combineReducers({
    dropAnalysis: dropAnalysisReducer
})