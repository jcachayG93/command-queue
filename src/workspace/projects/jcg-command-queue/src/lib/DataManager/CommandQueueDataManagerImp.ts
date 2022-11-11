import {ViewModel} from "../api/ViewModel";
import {CommandQueueDataManager} from "../api/CommandQueueDataManager";
import {DataManagerCommand} from "../api/DataManagerCommand";
import {Observable, Subject} from "rxjs";
import {IDmReader} from "./support/IDmReader";
import {IDmWriter} from "./support/IDmWriter";

export class CommandQueueDataManagerImp<TViewModel extends ViewModel>
  extends CommandQueueDataManager<TViewModel>
{

  constructor(
    private reader : IDmReader<TViewModel>,
    private writer : IDmWriter
  ) {
    super();
  }
  cancelCommands(): void {
    this.writer.cancelAllCommands();
  }

  get commandsInQueue(): number {
    return this.writer.commandsInQueue;
  }

  executeCommand(cmd: DataManagerCommand): void {
    this.writer.executeCommand(cmd);
  }

  get onViewModelUpdated(): Subject<void> {
    return this.reader.onViewModelUpdated;
  }

  readViewModel(): Observable<void> {
    return this.reader.readViewModel();
  }

  get viewModel(): TViewModel | null {
    return this.reader.viewModel;
  }

  get writeErrorOccurred(): Subject<Error> {
    return this.writer.writeErrorOccurred;
  }

  get modelVersion(): number {
    return this.reader.version;
  }

}
