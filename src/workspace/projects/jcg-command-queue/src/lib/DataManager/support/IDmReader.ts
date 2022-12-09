/**
 * Implements all CommandQueue data manager operations related to reading data
 */
import {Observable, Subject} from "rxjs";
import {CommandQueueViewModel} from "../../api/command-queue-view-model";
import {ConcurrencyToken} from "../../api/concurrency-token";

export interface IDmReader
{
  /**
   * Reads the view model from the server
   */
  readViewModel():Observable<void>;

  /**
   * Gets the view model that was read last. Null if readViewModel has not
   * been called or resolved yet.
   */
  get viewModel() : CommandQueueViewModel | null;

  /**
   * A subject that emits each time the ViewModel is updated (reloaded or
   * changed)
   */
  get onViewModelChanged():Subject<void>;

  /**
   * Emits each time the view model is read from the server
   */
  get onViewModelReadFromServer():Subject<void>;

  /**
   * TODO: Remove deprecated code
   * @deprecated The method should not be used
   */
  get version(): number

  /**
   * The response from the previous command
   */
  get currentToken():ConcurrencyToken | null;
}
