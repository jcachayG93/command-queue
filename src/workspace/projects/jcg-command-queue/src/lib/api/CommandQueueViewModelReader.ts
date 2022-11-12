import {CommandQueueViewModel} from "./CommandQueueViewModel";
import {Observable} from "rxjs";

/**
 * Knows how to read the view model from the remote server
 */
export abstract class CommandQueueViewModelReader {
  abstract read(): Observable<CommandQueueViewModel>;
}
