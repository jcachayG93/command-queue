import {IDmWriter} from "../IDmWriter";
import {Subject} from "rxjs";
import {CommandQueueCommand} from "../../../api/command-queue-command";
import {IDmMediator} from "../IDmMediator";
import {QueueFactory} from "../../../QueueV2/QueueFactory";
import {IQueue} from "../../../QueueV2/IQueue";
import {
  CommandQueueUpdateViewModelFunctionFactoryService
} from "../../../api/command-queue-update-view-model-function-factory.service";
import {IAssertViewModelFunction} from "../../../api/IAssertViewModelFunction";
import {IWriteErrorHandler} from "../IWriteErrorHandler";


export class DmWriter
  implements IDmWriter
{
  constructor(
    private queueFactory : QueueFactory,
    private mediator : IDmMediator,
    private updateViewModelFunctionFactory : CommandQueueUpdateViewModelFunctionFactoryService,
    private writeErrorHandler : IWriteErrorHandler
  ) {
    this._queue = this.queueFactory.create();
  }

  get pendingCommands(): CommandQueueCommand[] {
        return this._queue.pendingCommands;
    }

  private _queue : IQueue;

  cancelAllCommands(): void {
    this._queue.cancelAll();
    this._queue = this.queueFactory.create();
    this.mediator.read();
  }

  executeCommand(cmd: CommandQueueCommand): void {
    const updateVmFunction = this.updateViewModelFunctionFactory
      .create(cmd);
    updateVmFunction(this.mediator.viewModel!);
    this.mediator.emitViewModelUpdated();
    this._queue?.add(cmd,(e)=>{
      this.writeErrorHandler
        .handle(e, this);
    });
  }

  executeCommands(
    cmds: CommandQueueCommand[],
    assertFunction: IAssertViewModelFunction): void {
    cmds.forEach(cmd=>{
      const updateVmFunction = this.updateViewModelFunctionFactory
        .create(cmd);
      updateVmFunction(this.mediator.viewModel!);
    });
    try {
      assertFunction(this.mediator.viewModel!);
    } catch (e) {
      this.writeErrorHandler.handle(e as Error, this);
      return;
    }

    this.mediator.emitViewModelUpdated();
    cmds.forEach(cmd=>{
      this._queue?.add(cmd,e=>
      this.writeErrorHandler.handle(e,this));
    });
  }

  get writeErrorOccurred(): Subject<Error> {
    return this._writeErrorOccurred;
  }

  private _writeErrorOccurred = new Subject<Error>();

  initializeQueue(): void {
    this._queue = this.queueFactory
      .create();
  }

  get queue(): IQueue {
    return this._queue;
  }

  emitWriteErrorOccurred(e:Error): void {
    this._writeErrorOccurred.next(e);
  }
}
