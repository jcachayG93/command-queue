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
    private dmExecuteCommandRelated : DmExecuteCommandRelated<TViewModel>
  ) {
    super();
  }


  cancelCommands(): void {
    this.dmExecuteCommandRelated.cancelCommands();
  }

  get commandsInQueue(): number {
    return this.dmExecuteCommandRelated.commandsInQueue;
  }

  executeCommand(cmd: DataManagerCommand): void {
    this.dmExecuteCommandRelated.executeCommand(cmd);
  }

  get onViewModelUpdated(): Subject<void> {
    return this.dmReadRelated.onViewModelUpdated;
  }

  readViewModel(): Observable<void> {
    return this.dmReadRelated.readViewModel();
  }

  get viewModel(): TViewModel | null {
    return this.dmReadRelated.viewModel;
  }


  get writeErrorOccurred(): Subject<Error> {
    return this.dmExecuteCommandRelated.writeErrorOccurred;
  }

}
