import {DataManagerCommand} from "./DataManagerCommand";
import {Observable} from "rxjs";

export abstract class DataService {
  /**
   * A data service that can run commands on a remote server
   * @param version the optimistic concurrency version value
   * @param cmd the command to execute
   * @throws ConcurrencyVersionMismatchError when the server determines that the version sent did not match the
   * expected value
   */
  abstract execute(version: number, cmd: DataManagerCommand): Observable<number>;

}

