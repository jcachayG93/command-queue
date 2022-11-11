import {Queue} from "../Queue/Queue";
import {IExecuteCommandFunction} from "../DataManager/support/IExecuteCommandFunction";
import {Mock} from "moq.ts";
import {Logger} from "../DataManager/support/Logger";

/**
   * @deprecated The method should not be used
   * // TODO: Remove deprecated code
   */

export class QueueDouble extends Queue
{
  constructor() {
    super(new Logger());
    this.commandsInQueue = 10;
    this.commandsCancelled = 5;
    this.commandsRan = 5;
  }
  override add(f: IExecuteCommandFunction, errorCallback: (e: Error) => void) {
    this.test_addArgs = new QueueAddArgs(f,errorCallback);
  }

  override cancelAll() {
    this.test_cancelAllWasCalled = true;
  }

  test_cancelAllWasCalled = false;

  test_addArgs : QueueAddArgs | null = null;
}

export class QueueAddArgs
{

  constructor(f: IExecuteCommandFunction, errorCallback: (e: Error) => void) {
    this.f = f;
    this.errorCallback = errorCallback;
  }

  f:IExecuteCommandFunction;
  errorCallback:(e:Error)=>void;
}


