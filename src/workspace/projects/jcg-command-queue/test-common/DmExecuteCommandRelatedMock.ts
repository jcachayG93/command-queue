import {DmExecuteCommandRelated} from "../src/lib/DataManager/support/DmExecuteCommandRelated";
import {It, Mock} from "moq.ts";
import {DataManagerCommand} from "../src/lib/api/DataManagerCommand";
import {Subject} from "rxjs";
import {ViewModelImp} from "./ViewModelImp";

export class DmExecuteCommandRelatedMock
{
  constructor() {
    this.moq = new Mock<DmExecuteCommandRelated<ViewModelImp>>();
    this.moq.setup(s=>s.cancelCommands()).returns();
    this.moq.setup(s=>s.executeCommand(It.IsAny())).returns();
    this.moq.setup(s=>s.commandsInQueue).returns(10);
    this.moq.setup(s=>s.writeErrorOccurred).returns(new Subject<Error>());
  }
  private moq : Mock<DmExecuteCommandRelated<ViewModelImp>>;

  get object():DmExecuteCommandRelated<ViewModelImp>
  {
    return this.moq.object();
  }

  verifyCancelCommands():void
  {
    this.moq.verify(s=>s.cancelCommands());
  }

  verifyExecuteCommand(cmd: DataManagerCommand):void
  {
    this.moq.verify(s=>s.executeCommand(cmd));
  }


}
