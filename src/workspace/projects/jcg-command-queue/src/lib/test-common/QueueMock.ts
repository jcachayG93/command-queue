
import {IQueue} from "../QueueV2/IQueue";
import {CommandQueueCommand} from "../api/command-queue-command";
import {IExecuteCommandFunction} from "../DataManager/support/IExecuteCommandFunction";

export class QueueMock
  implements IQueue
{
  private _commandsRan = 5;
  private _commandsCancelled = 10;
  private _pendingCommands
  : CommandQueueCommand[] = [];
  add(cmd: CommandQueueCommand, errorCallback: (e: Error) => void): void {
    this.test_addArgs = new QueueAddArgs(cmd, errorCallback);
    this.test_addArgsSequence.push(this.test_addArgs);
  }

  cancelAll(): void {
    this.test_cancelAllWasCalled = true;
  }

  get commandsCancelled(): number {
    return this._commandsCancelled;
  }

  get commandsRan(): number {
    return this._commandsRan;
  }

  get pendingCommands(): CommandQueueCommand[] {
    return this._pendingCommands;
  }

  test_addArgs : QueueAddArgs | null = null;
  test_addArgsSequence : QueueAddArgs[]=[];
  test_cancelAllWasCalled = false;
}

export class QueueAddArgs
{
  constructor(
    public cmd: CommandQueueCommand,
    public errorCallback: (e: Error) => void) {

  }
}
