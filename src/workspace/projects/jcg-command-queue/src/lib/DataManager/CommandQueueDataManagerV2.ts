import {Observable, Subject} from "rxjs";
import {CommandQueueViewModelReaderService} from "../api/command-queue-view-model-reader.service";
import {CommandQueueViewModel} from "../api/command-queue-view-model";
import {ConcurrencyToken} from "../api/concurrency-token";
import {QueueFactory} from "../QueueV2/QueueFactory";
import {
  CommandQueueUpdateViewModelFunctionFactoryService
} from "../api/command-queue-update-view-model-function-factory.service";
import {IQueue} from "../QueueV2/IQueue";
import {CommandQueueCommand} from "../api/command-queue-command";
import {IAssertViewModelFunction} from "../api/IAssertViewModelFunction";
import {ICurrentTokenContainer} from "./ICurrentTokenContainer";

export class CommandQueueDataManagerV2
  implements ICurrentTokenContainer
{
  constructor(
    private reader : CommandQueueViewModelReaderService,
    private queueFactory : QueueFactory,
    private updateViewModelFunctionFactory : CommandQueueUpdateViewModelFunctionFactoryService) {
    this.initializeQueue();
  }


  onViewModelReadFromServer : Subject<void> = new Subject<void>();

  onViewModelUpdated : Subject<void> = new Subject<void>();

  onWriteErrorOccurred : Subject<Error> = new Subject<Error>();

  viewModel : CommandQueueViewModel | null = null;

  currentToken : ConcurrencyToken | null = null;

  get pendingCommands(): CommandQueueCommand[] {
    return this.queue.pendingCommands;
  }

  queue! : IQueue;

  readViewModel():Observable<void>
  {
    return new Observable<void>(obs=>{
      this.reader.read()
        .subscribe({
          next:r=>{
            this.viewModel = r.viewModel;
            this.currentToken = r.token;
            this.onViewModelReadFromServer.next();
            this.onViewModelUpdated.next();

            obs.complete();
          },
          error:e=>obs.error(e)
        });
    });
  }
  cancelAllCommands():void
  {
    this.queue.cancelAll();
    this.initializeQueue();
    this.readViewModel().subscribe();
  }

  executeCommand(cmd:CommandQueueCommand):void
  {
    const updateVmFunction = this.updateViewModelFunctionFactory
      .create(cmd);
    updateVmFunction(this.viewModel!);
    this.onViewModelUpdated.next();

    this.queue.add(cmd,(e)=>{
      this.cancelAllCommands();
      this.onWriteErrorOccurred.next(e);
    },this);
  }

  executeCommands(commands : CommandQueueCommand[],
                  assertFunction : IAssertViewModelFunction):void
  {
    commands.forEach(cmd=>{
      const updateVmFunction = this.updateViewModelFunctionFactory
        .create(cmd);
      updateVmFunction(this.viewModel!);
    });
    try {
      assertFunction(this.viewModel!);
    } catch (e){
      this.cancelAllCommands();
      this.onWriteErrorOccurred.next(e as Error);
      return;
    }

    this.onViewModelUpdated.next();

    commands.forEach(cmd=>{
      this.queue.add(cmd,e=>{
        this.cancelAllCommands();
        this.onWriteErrorOccurred.next(e as Error);
      },this);
    })
  }

  initializeQueue(): void {
    this.queue = this.queueFactory
      .create();
  }
}
