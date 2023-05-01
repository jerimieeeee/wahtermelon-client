import { BirthInformation } from './models/birthinformation.model';

export interface AppState {
  readonly birthinfo: BirthInformation[];
}