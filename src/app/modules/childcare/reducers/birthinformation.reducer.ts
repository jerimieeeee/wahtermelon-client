import { Action } from '@ngrx/store'
import { BirthInformation } from '../models/birthinformation.model'
import * as BirthInformationActions from '../actions/birthinformation.action'

// Section 1
const initialState: BirthInformation = {
    weight: 'Null',
    mname: 'Null',
    
}

// Section 2
export function reducer(state: BirthInformation[] = [initialState], action: BirthInformationActions.Actions) {

    // Section 3
    switch(action.type) {
        case BirthInformationActions.ADD_WEIGHT:
            return [...state, action.payload];
        default:
            return state;
    }
}