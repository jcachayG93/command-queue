import {IQueue} from "./IQueue";
import {IExecuteCommandFunctionFactory} from "../DataManager/support/IExecuteCommandFunctionFactory";
import {Logger} from "../DataManager/support/Logger";
import {Queue} from "./Queue";

export class QueueFactory
{
  constructor(
    private logger : Logger,
    private executeFunctionFactory : IExecuteCommandFunctionFactory
  ) {
  }
  create():IQueue
  {
    return new Queue(
      this.logger,
      this.executeFunctionFactory
    );

  }
}
