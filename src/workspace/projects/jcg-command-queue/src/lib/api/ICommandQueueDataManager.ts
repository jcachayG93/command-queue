import {Observable, Subject} from "rxjs";
import {CommandQueueViewModel} from "./command-queue-view-model";
import {ConcurrencyToken} from "./concurrency-token";
import {CommandQueueCommand} from "./command-queue-command";
import {IAssertViewModelFunction} from "./IAssertViewModelFunction";

export interface ICommandQueueDataManager {
  onViewModelReadFromServer: Subject<void>;
  onViewModelUpdated: Subject<void>;
  onWriteErrorOccurred: Subject<Error>;
  viewModel: CommandQueueViewModel | null;
  currentToken: ConcurrencyToken | null;
  readonly pendingCommands: CommandQueueCommand[];

  readViewModel(): Observable<void>;

  cancelAllCommands(): void;

  executeCommand(cmd: CommandQueueCommand): void;

  executeCommands(commands: CommandQueueCommand[],
                  assertFunction: IAssertViewModelFunction): void;
}
