import {IQueue} from "./IQueue";
import {IExecuteCommandFunctionFactory} from "../DataManager/support/IExecuteCommandFunctionFactory";
import {Logger} from "../DataManager/support/Logger";
import {Queue} from "./Queue";
import {CommandQueueDataService} from "../api/command-queue-data.service";
import {ExecuteCommandFunctionFactory} from "../DataManager/support/Imp/ExecuteCommandFunctionFactory";

export class QueueFactory
{
  constructor(
    private dataService : CommandQueueDataService
  ) {
  }
  create():IQueue
  {
    return new Queue(
      new ExecuteCommandFunctionFactory(this.dataService)
    );

  }
}
