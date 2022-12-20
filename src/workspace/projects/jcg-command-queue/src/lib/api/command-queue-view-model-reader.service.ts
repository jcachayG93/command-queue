import {Observable} from "rxjs";
import {CommandQueueReaderResponseDto} from "./command-queue-reader-response-dto";

/**
 * Knows how to read the view model from the remote server
 */

export abstract class CommandQueueViewModelReader {


  /**
   * Reads the ViewModel from the server
   */
  abstract read(): Observable<CommandQueueReaderResponseDto>;
}

