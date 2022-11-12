import {CommandQueueCommand} from "../../api/CommandQueueCommand";
import {IExecuteCommandFunction} from "./IExecuteCommandFunction";

export interface IExecuteCommandFunctionFactory
{
  /**
   * Creates the execute command function
   */
  create(cmd : CommandQueueCommand)
  : IExecuteCommandFunction;
}
