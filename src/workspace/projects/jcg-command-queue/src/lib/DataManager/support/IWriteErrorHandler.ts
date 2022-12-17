import {IDmWriter} from "./IDmWriter";

export interface IWriteErrorHandler
{
  handle(e:Error, dmWriter:IDmWriter):void;
}
