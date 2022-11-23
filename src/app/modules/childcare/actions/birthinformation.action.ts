// Section 1
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { BirthInformation } from '../models/birthinformation.model'

// Section 2
export const ADD_WEIGHT       = '[WEIGHT] Add'
export const UPDATE_WEIGHT    = '[WEIGHT] Update'

// Section 3
export class AddWeight implements Action {
    readonly type = ADD_WEIGHT

    constructor(public payload: BirthInformation) {}
}

export class UpdateWeight implements Action {
    readonly type = UPDATE_WEIGHT

    constructor(public payload: number) {}
}

// Section 4
export type Actions = AddWeight | UpdateWeight