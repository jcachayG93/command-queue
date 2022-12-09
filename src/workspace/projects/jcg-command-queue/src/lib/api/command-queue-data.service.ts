import {CommandQueueCommand} from "./command-queue-command";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ConcurrencyToken} from "./concurrency-token";

@Injectable({
  providedIn:'root'
})
export abstract class CommandQueueDataService {
  /**
   * TODO: Remove deprecated code
   * @deprecated The method should not be used
   */
  abstract executeOLD(version: number, cmd: CommandQueueCommand): Observable<number>;

  /**
   * A data service that can run commands on a remote server
   * @param version the optimistic concurrency version value
   * @param cmd the command to execute
   * @param token, a token that represents the response to be passed to the next command in the queue.
   * @throws ConcurrencyVersionMismatchError when the server determines that the version sent did not match the
   * expected value
   */
  abstract execute(token:ConcurrencyToken, cmd: CommandQueueCommand): Observable<ConcurrencyToken>;

}

