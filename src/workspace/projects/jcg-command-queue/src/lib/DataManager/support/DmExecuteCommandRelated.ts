import {Subject} from "rxjs";
import {DataManagerCommand} from "../../api/DataManagerCommand";
import {QueueFactory} from "../../Queue/QueueFactory";

export class DmExecuteCommandRelated
{
  constructor(
    queueFactory : QueueFactory
  ) {
    // create queue
  }

  cancelCommands():void
  {
    throw new Error('not implemented');
  }


  /**
   * Adds a command to the queue
   * @param cmd
   */
  executeCommand(cmd : DataManagerCommand):void
  {
    throw new Error('not implemented');
  }

  /**
   * Gets the number of commands  in the queue
   */
  get commandsInQueue():number
  {
    throw new Error('not implemented');
  }

  /**
   * Emits when a concurrency version mismatch occurs and the data
   * is re-loaded
   */
  get concurrencyVersionMismatchOccurred():Subject<void>
  {
    throw new Error('not implemented');
  }
}
