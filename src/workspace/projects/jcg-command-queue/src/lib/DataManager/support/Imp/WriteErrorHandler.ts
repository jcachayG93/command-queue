import {IWriteErrorHandler} from "../IWriteErrorHandler";
import {IDmWriter} from "../IDmWriter";

export class WriteErrorHandler
  implements IWriteErrorHandler
{


  handle(e: Error, dmWriter: IDmWriter): void {
    dmWriter.cancelAllCommands();
    dmWriter.emitWriteErrorOccurred(e);
  }
}
