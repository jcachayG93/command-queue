import {IDmWriter} from "../IDmWriter";
import {Subject} from "rxjs";
import {CommandQueueCommand} from "../../../api/command-queue-command";
import {IExecuteCommandFunctionFactory} from "../IExecuteCommandFunctionFactory";
import {IDmMediator} from "../IDmMediator";
import {QueueFactoryV2} from "../../../QueueV2/QueueFactoryV2";
import {IQueue} from "../../../QueueV2/IQueue";


export class DmWriter
  implements IDmWriter
{
  constructor(
    private queueFactory : QueueFactoryV2,
    private executeCommandFunctionFactory : IExecuteCommandFunctionFactory,
    private mediator : IDmMediator
  ) {
    this._queue = this.queueFactory.create();
  }
  private _queue : IQueue;

  cancelAllCommands(): void {
    this._queue.cancelAll();
    this._queue = this.queueFactory.create();
    this.mediator.read();
  }

  get commandsInQueue(): number {
    return this._queue.pendingCommands.length;
  }

  executeCommand(cmd: CommandQueueCommand): void {
    let fn = this.executeCommandFunctionFactory
      .create(cmd);
    this._queue?.add(fn,(e)=>{
      this._queue.cancelAll();
      this._queue = this.queueFactory.create();
      this.mediator.read();
      this._writeErrorOccurred.next(e);
    });
  }

  get writeErrorOccurred(): Subject<Error> {
    return this._writeErrorOccurred;
  }

  private _writeErrorOccurred = new Subject<Error>();

}
