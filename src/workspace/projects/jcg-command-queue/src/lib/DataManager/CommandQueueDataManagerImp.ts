import {CommandQueueViewModel} from "../api/CommandQueueViewModel";
import {CommandQueueDataManagerService} from "../api/command-queue-data-manager.service";
import {CommandQueueCommand} from "../api/CommandQueueCommand";
import {Observable, Subject} from "rxjs";
import {IDmReader} from "./support/IDmReader";
import {IDmWriter} from "./support/IDmWriter";
import {Logger} from "./support/Logger";

export class CommandQueueDataManagerImp extends CommandQueueDataManagerService
{

  constructor(
    private reader : IDmReader,
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

  executeCommand(cmd: CommandQueueCommand): void {

    this.writer.executeCommand(cmd);
  }

  get onViewModelChanged(): Subject<void> {
    return this.reader.onViewModelChanged;
  }

  readViewModel(): Observable<void> {
    return this.reader.readViewModel();
  }

  get viewModel(): CommandQueueViewModel | null {
    return this.reader.viewModel;
  }

  get onWriteErrorOccurred(): Subject<Error> {
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

  get onViewModelReadFromServer(): Subject<void> {
    return this.reader.onViewModelReadFromServer;
  }

}
