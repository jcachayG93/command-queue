import {CommandQueueViewModel} from "./command-queue-view-model";

/**
 * A function that updates the state of a view model when applied
 */
export interface IUpdateViewModelFunction {
  (args: CommandQueueViewModel): void;
}
