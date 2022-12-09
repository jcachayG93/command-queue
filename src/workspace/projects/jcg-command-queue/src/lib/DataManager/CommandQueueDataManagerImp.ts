import {CommandQueueViewModel} from "../api/command-queue-view-model";
import {CommandQueueDataManagerService} from "../api/command-queue-data-manager.service";
import {CommandQueueCommand} from "../api/command-queue-command";
import {Observable, Subject} from "rxjs";
import {IDmReader} from "./support/IDmReader";
import {IDmWriter} from "./support/IDmWriter";
import {Logger} from "./support/Logger";
import { ConcurrencyToken } from "../api/concurrency-token";

export class CommandQueueDataManagerImp extends CommandQueueDataManagerService {


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



  get currentToken(): ConcurrencyToken | null {
    return this.reader.currentToken;
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
