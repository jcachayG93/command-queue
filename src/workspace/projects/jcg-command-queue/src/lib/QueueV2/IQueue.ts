import {CommandQueueCommand} from "../api/command-queue-command";
import {ICurrentTokenContainer} from "../DataManager/ICurrentTokenContainer";

export interface IQueue {

  get pendingCommands(): CommandQueueCommand[];

  get commandsRan(): number;

  get commandsCancelled(): number;

  /**
   * Adds a command to the queue
   */
  add(cmd: CommandQueueCommand, errorCallback: (e: Error) => void,
      tokenContainer : ICurrentTokenContainer): void;

  cancelAll(): void;
}
