import {IDmWriter} from "../IDmWriter";
import {Subject} from "rxjs";
import {CommandQueueCommand} from "../../../api/command-queue-command";
import {IDmMediator} from "../IDmMediator";
import {QueueFactory} from "../../../QueueV2/QueueFactory";
import {IQueue} from "../../../QueueV2/IQueue";
import {
  CommandQueueUpdateViewModelFunctionFactoryService
} from "../../../api/command-queue-update-view-model-function-factory.service";


export class DmWriter
  implements IDmWriter
{
  constructor(
    private queueFactory : QueueFactory,
    private mediator : IDmMediator,
    private updateViewModelFunctionFactory : CommandQueueUpdateViewModelFunctionFactoryService
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
