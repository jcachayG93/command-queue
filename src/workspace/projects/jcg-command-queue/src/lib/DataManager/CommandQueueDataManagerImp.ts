import {ViewModel} from "../api/ViewModel";
import {CommandQueueDataManager} from "../api/CommandQueueDataManager";
import {DataManagerCommand} from "../api/DataManagerCommand";
import {Observable, Subject} from "rxjs";
import {Queue} from "../Queue/Queue";
import {QueueFactory} from "../Queue/QueueFactory";
import {ViewModelReader} from "../api/ViewModelReader";
import {DataManagerExecuteCommandFunctionFactory} from "./support/DataManagerExecuteCommandFunctionFactory";
import {IConcurrencyVersionMismatchErrorHandler} from "./IConcurrencyVersionMismatchErrorHandler";
import {ViewModelNotReadError} from "../api/errors/view-model-not-read-error";

export class CommandQueueDataManagerImp<TViewModel extends ViewModel>
  extends CommandQueueDataManager<TViewModel>
  implements IConcurrencyVersionMismatchErrorHandler
{
  constructor(
    private queueFactory : QueueFactory,
    private executeCommandFunctionFactory : DataManagerExecuteCommandFunctionFactory<TViewModel>,
    private reader : ViewModelReader<TViewModel>
  ) {
    super();
    this._queue = this.queueFactory.create();
  }

  cancelCommands(): void {
    throw new Error('Not Implemented');
  }

  get commandsInQueue(): number {
    if (this._queue)
    {
      return this._queue.commandsInQueue;
    }
    return 0;
  }

  executeCommand(cmd: DataManagerCommand): void {
    if (this._viewModel == null)
    {
      throw new ViewModelNotReadError();
    }
    const commandFunction = this.executeCommandFunctionFactory
      .create(this._viewModel,this);
    this._queue.add(commandFunction);
  }

  get onViewModelUpdated(): Subject<void> {
    throw new Error('Not Implemented');
  }

  readViewModel(): Observable<void> {
    return new Observable<void>(obs=>{
      this.reader.read().subscribe(vm=>
      {
        this._viewModel = vm;
        obs.complete();
      });
    })
  }

  get viewModel(): TViewModel | null {
    return this._viewModel;
  }

  private _viewModel : TViewModel | null = null;
  private _queue! : Queue;

  onConcurrencyVersionMismatch(): void {
  }

  get ConcurrencyVersionMismatchOccurred(): Subject<void> {
    throw new Error('Not Implemented');
  }
}
