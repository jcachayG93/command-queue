import {IDmWriter} from "../DataManager/support/IDmWriter";
import {It, Mock} from "moq.ts";
import {DataManagerCommand} from "../api/DataManagerCommand";
import {Subject} from "rxjs";

export class DmWriterMock
{
  constructor() {
    this.moq = new Mock<IDmWriter>();
    this.moq.setup(s=>s.commandsInQueue).returns(10);
    this.moq.setup(s=>s.executeCommand(It.IsAny())).returns();
    this.moq.setup(s=>s.cancelAllCommands()).returns();
    this.moq.setup(s=>
    s.writeErrorOccurred).returns(new Subject<Error>());
  }
  private moq : Mock<IDmWriter>;

  get object(): IDmWriter
  {
    return this.moq.object();
  }

  verifyExecuteCommand(cmd:DataManagerCommand):void
  {
    this.moq.verify(s=>s.executeCommand(cmd));
  }
  verifyCancelAllCommands()
  {
    this.moq.verify(s=>s.cancelAllCommands());
  }

}
