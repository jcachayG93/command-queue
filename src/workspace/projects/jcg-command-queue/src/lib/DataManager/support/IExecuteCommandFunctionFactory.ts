import {DataManagerCommand} from "../../api/DataManagerCommand";
import {IExecuteCommandFunction} from "./IExecuteCommandFunction";

export interface IExecuteCommandFunctionFactory
{
  /**
   * Creates the execute command function
   */
  create(cmd : DataManagerCommand)
  : IExecuteCommandFunction;
}
