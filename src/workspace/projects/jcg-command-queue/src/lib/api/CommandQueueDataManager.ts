import {Observable, Subject} from "rxjs";
import {DataManagerCommand} from "./DataManagerCommand";
import {ViewModel} from "./ViewModel";

/**
 * Allows for adding commands to a queue so they can be processed at the server speed, while updating a copy of a
 * local view model immediately, so the user can see the udpates before the server process them. Implements optimistic
 * concurrency. With each command, the local version is sent to the server and the new version is returned and updated.
 * If there is an optimistic concurrency mismatch error, the remaining commands are cancelled, and the view model is
 * reloaded from the server, together with the current model version.
 */
export abstract class CommandQueueDataManager<TViewModel extends ViewModel>
{
  /**
   * Reads the view model from the server
   */
  abstract readViewModel():Observable<void>;

  /**
   * The view model, which will be null if it was not read
   */
  abstract get viewModel() : TViewModel | null;

  /**
   * The number of commands in the queue
   */
  abstract get commandsInQueue():number;

  /**
   * Emits when the view model changes, either because it was updated after applying a command or because it
   * was loaded/reloaded from the server
   */
  abstract get onViewModelUpdated():Subject<void>;

  /**
   * Adds a command to the queue
   * @param cmd
   */
  abstract executeCommand(cmd : DataManagerCommand):void;

  /**
   * Cancel all remaining commands, reload the view model
   */
  abstract cancelCommands():void;

  /**
   * Emits when a concurrency version mismatch occurs and the data
   * is re-loaded
   */
  abstract get ConcurrencyVersionMismatchOccurred():Subject<void>;
}



export class ConcurrencyVersionMismatchException
{

}



