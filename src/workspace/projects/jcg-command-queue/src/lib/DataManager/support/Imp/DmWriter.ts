import {IDmWriter} from "../IDmWriter";
import {Subject} from "rxjs";
import {CommandQueueCommand} from "../../../api/command-queue-command";
import {QueueFactory} from "../../../Queue/QueueFactory";
import {IExecuteCommandFunctionFactory} from "../IExecuteCommandFunctionFactory";
import {IDmMediator} from "../IDmMediator";
import {Queue} from "../../../Queue/Queue";


export class DmWriter
  implements IDmWriter
{
  constructor(
    private queueFactory : QueueFactory,
    private executeCommandFunctionFactory : IExecuteCommandFunctionFactory,
    private mediator : IDmMediator
  ) {
    this._queue = this.queueFactory.create();
  }
  private _queue : Queue;

  cancelAllCommands(): void {
    this._queue.cancelAll();
    this._queue = this.queueFactory.create();
    this.mediator.read();
  }

  get commandsInQueue(): number {
    return this._queue.commandsInQueue;
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
