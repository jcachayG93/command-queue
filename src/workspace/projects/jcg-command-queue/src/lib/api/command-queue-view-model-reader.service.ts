import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {CommandQueueReaderResponseDto} from "./command-queue-reader-response.dto";

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
  abstract read(): Observable<CommandQueueReaderResponseDto>;
}

