
import {Observable} from "rxjs";

/**
 * Wraps the execute command function
 */
export interface IExecuteCommandFunction
{
  ():Observable<void>;
}
