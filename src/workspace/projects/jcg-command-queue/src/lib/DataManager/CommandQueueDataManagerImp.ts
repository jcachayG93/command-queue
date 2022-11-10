import {CommandQueueDataManager} from "../api/CommandQueueDataManager";
import {ViewModel} from "../api/ViewModel";
import {Observable, Subject} from "rxjs";
import {DataManagerCommand} from "../api/DataManagerCommand";
import {DmReadRelated} from "./support/DmReadRelated";
import {DmExecuteCommandRelated} from "./support/DmExecuteCommandRelated";

export class CommandQueueDataManagerImp<TViewModel extends ViewModel>
  extends CommandQueueDataManager<TViewModel>
{
  constructor(
    private dmReadRelated : DmReadRelated<TViewModel>,
    private dmExecuteCommandRelated : DmExecuteCommandRelated
  ) {
    super();
  }
  get concurrencyVersionMismatchOccurred(): Subject<void> {
    throw new Error('not implemented');
  }

  cancelCommands(): void {
    throw new Error('not implemented');
  }

  get commandsInQueue(): number {
    throw new Error('not implemented');
  }

  executeCommand(cmd: DataManagerCommand): void {
    throw new Error('not implemented');
  }

  get onViewModelUpdated(): Subject<void> {
    throw new Error('not implemented');
  }

  readViewModel(): Observable<void> {
    throw new Error('not implemented');
  }

  get viewModel(): TViewModel | null {
    throw new Error('not implemented');
  }

}
