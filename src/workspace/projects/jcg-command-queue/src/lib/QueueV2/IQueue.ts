import {CommandQueueCommand} from "../api/command-queue-command";

export interface IQueue {

  get pendingCommands(): CommandQueueCommand[];

  get commandsRan(): number;

  get commandsCancelled(): number;

  /**
   * Adds a command to the queue
   */
  add(cmd: CommandQueueCommand, errorCallback: (e: Error) => void): void;

  cancelAll(): void;
}
