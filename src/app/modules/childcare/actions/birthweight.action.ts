// Section 1
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { BirthInfoWeight } from './../models/birthweight.model'

// Section 2
export const ADD_WEIGHT       = '[WEIGHT] Add'
export const REMOVE_WEIGHT    = '[WEIGHT] Remove'

// Section 3
export class AddWeight implements Action {
    readonly type = ADD_WEIGHT

    constructor(public payload: BirthInfoWeight) {}
}

export class RemoveWeight implements Action {
    readonly type = REMOVE_WEIGHT

    constructor(public payload: number) {}
}

// Section 4
export type Actions = AddWeight | RemoveWeight