import {Observable, Subject} from "rxjs";
import {ViewModel} from "../../api/ViewModel";
import {ViewModelReader} from "../../api/ViewModelReader";
import {IDmMediator} from "./IDmMediator";

/**
 * The DataManager delegates responsibilities related to reading the ViewModel
 */
export class DmReadRelated<TViewModel extends ViewModel>
{
  constructor(private reader : ViewModelReader<TViewModel>) {
  }

  /**
   * Reads the view model from the server, sets ViewModel with result.
   * Emits onViewModelUpdated
   */
  readViewModel():Observable<void>
  {
    throw new Error('not implemented');
  }

  /**
   * The current optimistic concurrency version. When the view model is read,
   * this is the same as the returned view model, but then, the data manager will keep
   * updating this value after each command is executed, so it wont longer match
   * the ViewModel.Version value. That is why this is named "Current"
   * This value changes to match the ViewModel.Version value after each read operation.
   */
  get CurrentVersion():number
  {
    throw new Error('not implemented');
  }

  /**
   * Sets the current Version number but does not modify the ViewModel.Version value so after
   * you call this method, both won't match until the view model is read again.
   * @param value the new model version value
   */
  setCurrentVersion(value:number):void
  {
    throw new Error('not implemented');
  }

  /**
   * The ViewModel, which is null before is read for the first time.
   */
  get viewModel():TViewModel| null
  {
    throw new Error('not implemented');
  }

  /**
   * Emits when the view model changes, each time is read or whenever the
   * data manager requires it
   */
  get onViewModelUpdated():Subject<void>
  {
    throw new Error('not implemented');
  }

  /**
   * Use by the data manager to emit ViewModelUpdated
   */
  emitViewModelUpdated():void
  {
    /*
    You could just use the onViewModelUpdated property to emit the notification, but, having this method
    better express the fact that the onViewModelUpdated subject will emit when you load the data or when the
    data manager requires it (typically after a command is executed)
     */
    throw new Error('not implemented');
  }

}
