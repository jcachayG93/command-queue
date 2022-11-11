import {ViewModel} from "../api/ViewModel";
import {CommandQueueDataManager} from "../api/CommandQueueDataManager";
import {DataManagerCommand} from "../api/DataManagerCommand";
import {Observable, Subject} from "rxjs";
import {IDmReader} from "./support/IDmReader";
import {IDmWriter} from "./support/IDmWriter";
import {Logger} from "./support/Logger";

export class CommandQueueDataManagerImp extends CommandQueueDataManager
{

  constructor(
    private reader : IDmReader<ViewModel>,
    private writer : IDmWriter,
    private logger : Logger
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

  get viewModel(): ViewModel | null {
    return this.reader.viewModel;
  }

  get writeErrorOccurred(): Subject<Error> {
    return this.writer.writeErrorOccurred;
  }

  get modelVersion(): number {
    return this.reader.version;
  }

  get developerLogs(): string[] {
    return this.logger.logs;
  }

  resetLogs(): void {
    this.logger.reset();
  }

}
