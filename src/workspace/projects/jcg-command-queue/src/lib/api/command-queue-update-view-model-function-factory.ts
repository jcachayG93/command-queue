import {CommandQueueViewModel} from "./command-queue-view-model";
import {CommandQueueCommand} from "./command-queue-command";
import {IUpdateViewModelFunction} from "./IUpdateViewModelFunction";
import {Injectable} from "@angular/core";

/**
 * A factory that creates a function that updates the view model to reflect the command
 */

export abstract class CommandQueueUpdateViewModelFunctionFactory {
  /**
   * Creates a function for the command, so when we call the function with the view model,
   * it will update the view model to reflect the changes commanded by the command.
   */
  abstract create(cmd: CommandQueueCommand): IUpdateViewModelFunction;
}

