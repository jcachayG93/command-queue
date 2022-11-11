import {ViewModel} from "./ViewModel";

/**
 * A function that updates the state of a view model when applied
 */
export interface IUpdateViewModelFunction {
  (args: ViewModel): void;
}
