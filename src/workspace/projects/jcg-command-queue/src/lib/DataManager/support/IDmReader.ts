/**
 * Implements all CommandQueue data manager operations related to reading data
 */
import {Observable, Subject} from "rxjs";
import {CommandQueueViewModel} from "../../api/command-queue-view-model";

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
   * The current model version
   */
  get version(): number

}
