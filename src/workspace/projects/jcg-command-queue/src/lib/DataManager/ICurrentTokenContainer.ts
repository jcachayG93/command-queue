import {ConcurrencyToken} from "../api/concurrency-token";


export interface ICurrentTokenContainer
{
  currentToken : ConcurrencyToken | null;
}
