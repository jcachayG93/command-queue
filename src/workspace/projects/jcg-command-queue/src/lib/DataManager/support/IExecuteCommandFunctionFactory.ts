import {CommandQueueCommand} from "../../api/command-queue-command";
import {IExecuteCommandFunction} from "./IExecuteCommandFunction";
import {ICurrentTokenContainer} from "../ICurrentTokenContainer";

export interface IExecuteCommandFunctionFactory
{
  /**
   * Creates the execute command function
   */
  create(cmd : CommandQueueCommand, tokenContainer : ICurrentTokenContainer)
  : IExecuteCommandFunction;
}
