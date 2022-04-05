import { Action } from '@ngrx/store'
import { BirthInfoWeight } from '../models/birthweight.model'
import * as TutorialActions from '../actions/birthweight.action'

// Section 1
const initialState: BirthInfoWeight = {
    weight: 'Enter Weight at Birth (kg)',
    mname: 'Search for Mothers Name'
    
}

// Section 2
export function reducer(state: BirthInfoWeight[] = [initialState], action: TutorialActions.Actions) {

    // Section 3
    switch(action.type) {
        case TutorialActions.ADD_WEIGHT:
            return [...state, action.payload];
        default:
            return state;
    }
}