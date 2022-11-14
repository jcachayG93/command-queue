import {CommandQueueViewModel} from "./command-queue-view-model";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

/**
 * Knows how to read the view model from the remote server
 */
@Injectable({
  providedIn:'root'
})
export abstract class CommandQueueViewModelReaderService {
  /**
   * Reads the ViewModel from the server
   */
  abstract read(): Observable<CommandQueueViewModel>;
}
