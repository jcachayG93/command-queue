/**
 * Implements all CommandQueue data manager operations related to
 * writting data
 */
import {CommandQueueCommand} from "../../api/command-queue-command";
import {Subject} from "rxjs";
import {IAssertViewModelFunction} from "../../api/IAssertViewModelFunction";
import {IQueue} from "../../QueueV2/IQueue";

export interface IDmWriter
{


  /**
   * The queue pending commands
   */
  get pendingCommands():CommandQueueCommand[];

  /**
   * Adds the command to the queue, and updates the view-model
   */
  executeCommand(cmd : CommandQueueCommand):void;

  /**
   * Adds the commands to the queue and updates the view-model.
   * Will apply the assert function to the resulting view-model.
   */
  executeCommands(cmds:CommandQueueCommand[],
                  assertFunction : IAssertViewModelFunction):void;

  /**
   * Cancels all the commands in the queue, which will have the
   * secondary effect of reloading the view-model to reflect the state
   * in the server
   */
  cancelAllCommands():void;

  /**
   * Emits when a write-error occurs
   */
  get writeErrorOccurred():Subject<Error>;

  emitWriteErrorOccurred(e:Error):void;

  /**
   * Creates and initialize a new queue
   */
  initializeQueue():void;

  get queue():IQueue;
}
