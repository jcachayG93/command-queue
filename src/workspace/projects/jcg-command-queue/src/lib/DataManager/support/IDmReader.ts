/**
 * Implements all CommandQueue data manager operations related to reading data
 */
import {Observable, Subject} from "rxjs";
import {ViewModel} from "../../api/ViewModel";

export interface IDmReader<TViewModel extends ViewModel>
{
  /**
   * Reads the view model from the server
   */
  readViewModel():Observable<void>;

  /**
   * Gets the view model that was read last. Null if readViewModel has not
   * been called or resolved yet.
   */
  get viewModel() : TViewModel | null;

  /**
   * A subject that emits each time the ViewModel is updated (reloaded or
   * changed)
   */
  get onViewModelUpdated():Subject<void>;

  /**
   * The current model version
   */
  get version(): number

}
