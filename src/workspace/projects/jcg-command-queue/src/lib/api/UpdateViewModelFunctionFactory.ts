import {ViewModel} from "./ViewModel";
import {DataManagerCommand} from "./DataManagerCommand";
import {IUpdateViewModelFunction} from "./IUpdateViewModelFunction";

/**
 * A factory that creates a function that updates the view model to reflect the command
 */
export abstract class UpdateViewModelFunctionFactory<TViewModel extends ViewModel> {
  /**
   * Creates a function for the command, so when we call the function with the view model,
   * it will update the view model to reflect the changes commanded by the command.
   */
  abstract create(cmd: DataManagerCommand): IUpdateViewModelFunction<TViewModel>;
}

