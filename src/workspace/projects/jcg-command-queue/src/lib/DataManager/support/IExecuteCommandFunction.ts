import {Observable} from "rxjs";

export interface IExecuteCommandFunction
{
  (): Observable<void>;
}
