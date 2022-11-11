import {ViewModel} from "./ViewModel";
import {Observable} from "rxjs";

/**
 * Knows how to read the view model from the remote server
 */
export abstract class ViewModelReader {
  abstract read(): Observable<ViewModel>;
}
