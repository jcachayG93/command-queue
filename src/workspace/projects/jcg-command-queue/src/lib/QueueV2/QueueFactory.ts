import {IQueue} from "./IQueue";
import {IExecuteCommandFunctionFactory} from "../DataManager/support/IExecuteCommandFunctionFactory";
import {Logger} from "../DataManager/support/Logger";
import {Queue} from "./Queue";

export class QueueFactory
{
  constructor(
    private executeFunctionFactory : IExecuteCommandFunctionFactory
  ) {
  }
  create():IQueue
  {
    return new Queue(
      this.executeFunctionFactory
    );

  }
}
