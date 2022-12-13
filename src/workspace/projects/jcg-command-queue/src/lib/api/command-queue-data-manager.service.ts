import {Observable, Subject} from "rxjs";
import {CommandQueueCommand} from "./command-queue-command";
import {CommandQueueViewModel} from "./command-queue-view-model";
import {Injectable} from "@angular/core";
import {ConcurrencyToken} from "./concurrency-token";

/**
 * Allows for adding commands to a queue so they can be processed at the server speed, while updating a copy of a
 * local view model immediately, so the user can see the udpates before the server process them. Implements optimistic
 * concurrency. With each command, the local version is sent to the server and the new version is returned and updated.
 * If there is an optimistic concurrency mismatch error, the remaining commands are cancelled, and the view model is
 * reloaded from the server, together with the current model version.
 */

@Injectable({
  providedIn:'root'
})
export abstract class CommandQueueDataManagerService
{
  /**
   * Reads the view model from the server
   */
  abstract readViewModel():Observable<void>;

  /**
   * The view model, which will be null if it was not read
   */
  abstract get viewModel() : CommandQueueViewModel | null;

  /**
   * Emits when the view model is updated
   */
  abstract get onViewModelChanged():Subject<void>;

  /**
   * Emits each time the view model is read from the server
   */
  abstract get onViewModelReadFromServer():Subject<void>;

  /**
   * Adds a command to the queue
   * @param cmd
   */
  abstract executeCommand(cmd : CommandQueueCommand):void;

  /**
   * Cancel all remaining commands, reload the view model
   */
  abstract cancelCommands():void;

  /**
   * The pending commands in the queue. The changes from this command may already been
   * applied to the local view-model, but, the queue contains those that have not yet been
   * processed by the server
   */
  abstract get pendingCommands():CommandQueueCommand[];

  /**
   * Emits when a write error occurred
   */
  abstract get onWriteErrorOccurred():Subject<Error>;



  /**
   * The response from the previous command
   */
  abstract get currentToken():ConcurrencyToken | null;
  /**
   * Gets the developer logs
   */
  abstract get developerLogs():string[];

  /**
   * Resets the developer logs
   */
  abstract resetLogs():void;
}



