import {IQueue} from "./IQueue";
import {Queue} from "../Queue/Queue";
import {IExecuteCommandFunctionFactory} from "../DataManager/support/IExecuteCommandFunctionFactory";
import {Logger} from "../DataManager/support/Logger";
import {QueueV2} from "./QueueV2";

export class QueueFactoryV2
{
  constructor(
    private logger : Logger,
    private executeFunctionFactory : IExecuteCommandFunctionFactory
  ) {
  }
  create():IQueue
  {
    return new QueueV2(
      this.logger,
      this.executeFunctionFactory
    );

  }
}
