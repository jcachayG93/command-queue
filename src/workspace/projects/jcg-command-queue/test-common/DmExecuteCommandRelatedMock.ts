import {DmExecuteCommandRelated} from "../src/lib/DataManager/support/DmExecuteCommandRelated";
import {Mock} from "moq.ts";
import {DataManagerCommand} from "../src/lib/api/DataManagerCommand";
import {Subject} from "rxjs";

export class DmExecuteCommandRelatedMock
{
  constructor() {
    this.moq = new Mock<DmExecuteCommandRelated>();
    this.moq.setup(s=>s.cancelCommands()).returns();
    this.moq.setup(s=>s.executeCommand()).returns();
    this.moq.setup(s=>s.commandsInQueue).returns(10);
    this.moq.setup(s=>s.concurrencyVersionMismatchOccurred)
      .returns(this._concurrencyVersionMismatchOccurrentSubject);
  }
  private moq : Mock<DmExecuteCommandRelated>;

  get object():DmExecuteCommandRelated
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

  private _concurrencyVersionMismatchOccurrentSubject = new Subject<void>();

  emitConcurrencyVersionMismatchOccurred():void
  {
    this._concurrencyVersionMismatchOccurrentSubject.next();
  }
}
