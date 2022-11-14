import {CommandQueueViewModel} from "./CommandQueueViewModel";
import {CommandQueueCommand} from "./CommandQueueCommand";
import {IUpdateViewModelFunction} from "./IUpdateViewModelFunction";
import {Injectable} from "@angular/core";

/**
 * A factory that creates a function that updates the view model to reflect the command
 */
@Injectable({
  providedIn:'root'
})
export abstract class CommandQueueUpdateViewModelFunctionFactoryService {
  /**
   * Creates a function for the command, so when we call the function with the view model,
   * it will update the view model to reflect the changes commanded by the command.
   */
  abstract create(cmd: CommandQueueCommand): IUpdateViewModelFunction;
}

