import { createStore } from 'redux'
import { AppReducer } from '@reducers/app.reducer'

export let store = createStore(AppReducer)
