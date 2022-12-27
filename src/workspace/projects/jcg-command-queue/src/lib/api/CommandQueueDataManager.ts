import {Observable, Subject} from "rxjs";
import {CommandQueueViewModelReader} from "../api/command-queue-view-model-reader.service";
import {CommandQueueViewModel} from "../api/command-queue-view-model";
import {ConcurrencyToken} from "../api/concurrency-token";
import {QueueFactory} from "../QueueV2/QueueFactory";
import {CommandQueueUpdateViewModelFunctionFactory} from "./command-queue-update-view-model-function-factory";
import {IQueue} from "../QueueV2/IQueue";
import {CommandQueueCommand} from "../api/command-queue-command";
import {IAssertViewModelFunction} from "../api/IAssertViewModelFunction";
import {ICurrentTokenContainer} from "../DataManager/ICurrentTokenContainer";
import {IUpdateViewModelFunction} from "./IUpdateViewModelFunction";
import {ICommandQueueDataManager} from "./ICommandQueueDataManager";


export class CommandQueueDataManager
  implements ICurrentTokenContainer, ICommandQueueDataManager {
  constructor(
    private reader : CommandQueueViewModelReader,
    private queueFactory : QueueFactory,
    private updateViewModelFunctionFactory : CommandQueueUpdateViewModelFunctionFactory) {
    this.initializeQueue();
  }


  onViewModelReadFromServer: Subject<void> = new Subject<void>();

  onViewModelUpdated: Subject<void> = new Subject<void>();

  onWriteErrorOccurred: Subject<Error> = new Subject<Error>();

  viewModel: CommandQueueViewModel | null = null;

  currentToken: ConcurrencyToken | null = null;

  protected createUpdateViewModelFunction(cmd:CommandQueueCommand):IUpdateViewModelFunction
  {
    return this.updateViewModelFunctionFactory.create(cmd);
  }

  get pendingCommands(): CommandQueueCommand[] {
    return this.queue.pendingCommands;
  }

  queue! : IQueue;

  readViewModel(): Observable<void> {

    return new Observable<void>(obs => {

      this.reader.read()
        .subscribe({
          next: r => {
            this.viewModel = r.viewModel;
            this.currentToken = r.token;
            this.onViewModelReadFromServer.next();
            this.onViewModelUpdated.next();

            obs.complete();
          },
          error: e => obs.error(e)
        });
    });
  }

  cancelAllCommands(): void {
    this.queue.cancelAll();
    this.initializeQueue();
    this.readViewModel().subscribe();
  }

  protected addToQueue(cmd:CommandQueueCommand, errorCallback:(e:Error)=>void)
  {
    this.queue.add(cmd, errorCallback, this);
  }

  executeCommand(cmd: CommandQueueCommand): void {
    const updateVmFunction = this.createUpdateViewModelFunction(cmd);
    updateVmFunction(this.viewModel!);
    this.onViewModelUpdated.next();

    this.addToQueue(cmd, (e) => {
      this.cancelAllCommands();
      this.onWriteErrorOccurred.next(e);
    });


  }

  executeCommands(commands: CommandQueueCommand[],
                  assertFunction: IAssertViewModelFunction): void {
    commands.forEach(cmd => {
      const updateVmFunction = this.createUpdateViewModelFunction(cmd);
      updateVmFunction(this.viewModel!);
    });
    try {
      assertFunction(this.viewModel!);
    } catch (e) {
      this.cancelAllCommands();
      this.onWriteErrorOccurred.next(e as Error);
      return;
    }

    this.onViewModelUpdated.next();

    commands.forEach(cmd => {

      this.addToQueue(cmd, e => {
        this.cancelAllCommands();
        this.onWriteErrorOccurred.next(e as Error);
      });
    })
  }

  initializeQueue(): void {
    this.queue = this.queueFactory
      .create();
  }
}
