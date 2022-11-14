import {CommandQueueCommand} from "../../api/command-queue-command";
import {IExecuteCommandFunction} from "./IExecuteCommandFunction";

export interface IExecuteCommandFunctionFactory
{
  /**
   * Creates the execute command function
   */
  create(cmd : CommandQueueCommand)
  : IExecuteCommandFunction;
}
