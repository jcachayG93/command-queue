import {Queue} from "../Queue/Queue";
import {IExecuteCommandFunction} from "../DataManager/support/IExecuteCommandFunction";

export class QueueDouble extends Queue
{
  override add(f: IExecuteCommandFunction, errorCallback: (e: Error) => void) {
    this.test_addArgs = new QueueAddArgs(f,errorCallback);
  }

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
