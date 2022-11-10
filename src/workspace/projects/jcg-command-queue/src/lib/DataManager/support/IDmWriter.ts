/**
 * Implements all CommandQueue data manager operations related to
 * writting data
 */
import {DataManagerCommand} from "../../api/DataManagerCommand";
import {Subject} from "rxjs";

export interface IDmWriter
{
  /**
   * Gets the number of commands currently in the queue
   */
  get commandsInQueue():number;

  /**
   * Adds the command to the queue
   */
  executeCommand(cmd : DataManagerCommand):void;

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
