import {IDmWriter} from "../DataManager/support/IDmWriter";
import {It, Mock} from "moq.ts";
import {CommandQueueCommand} from "../api/command-queue-command";
import {Subject} from "rxjs";
import {QueueMock} from "./QueueMock";

export class DmWriterMock
{
  constructor() {
    this.moq = new Mock<IDmWriter>();
    this.moq.setup(s=>s.executeCommand(It.IsAny())).returns();
    this.moq.setup(s=>s.cancelAllCommands()).returns();
    this.moq.setup(s=>
    s.writeErrorOccurred).returns(new Subject<Error>());
    this.moq.setup(s=>
    s.pendingCommands)
      .returns([]);
    this.queueMock = new QueueMock();
    this.moq.setup(s=>
    s.queue).returns(this.queueMock);
    this.moq.setup(s=>
    s.initializeQueue()).returns();
    this.moq.setup(s=>
    s.emitWriteErrorOccurred(It.IsAny()))
      .returns();
  }
  private moq : Mock<IDmWriter>;

  get object(): IDmWriter
  {
    return this.moq.object();
  }

  verifyExecuteCommand(cmd:CommandQueueCommand):void
  {
    this.moq.verify(s=>s.executeCommand(cmd));
  }
  verifyCancelAllCommands()
  {
    this.moq.verify(s=>s.cancelAllCommands());
  }

  queueMock : QueueMock;

  verifyInitializeQueue():void
  {
    this.moq.verify(s=>
    s.initializeQueue());
  }

  verifyEmitWriteErrorOccurred(e:Error):void
  {
    this.moq.verify(s=>
    s.emitWriteErrorOccurred(e));
  }
}
