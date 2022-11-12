import {CommandQueueViewModel} from "./CommandQueueViewModel";

/**
 * A function that updates the state of a view model when applied
 */
export interface IUpdateViewModelFunction {
  (args: CommandQueueViewModel): void;
}
