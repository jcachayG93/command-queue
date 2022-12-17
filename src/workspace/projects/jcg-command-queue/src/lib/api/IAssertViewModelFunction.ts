import {CommandQueueViewModel} from "./command-queue-view-model";

/**
 * Asserts the correctness of the view-model
 */
export interface IAssertViewModelFunction
{
  /**
   * Throw an exception if the view-model is in an invalid state. Similar to a domain aggregate invariants.
   */
  (vm:CommandQueueViewModel):void;
}
