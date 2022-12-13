/**
 * Implements all CommandQueue data manager operations related to
 * writting data
 */
import {CommandQueueCommand} from "../../api/command-queue-command";
import {Subject} from "rxjs";

export interface IDmWriter
{


  /**
   * The queue pending commands
   */
  get pendingCommands():CommandQueueCommand[];

  /**
   * Adds the command to the queue
   */
  executeCommand(cmd : CommandQueueCommand):void;

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

}
