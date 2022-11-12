import {CommandQueueDataService} from "../api/command-queue-data.service";
import {It, Mock} from "moq.ts";
import {CommandQueueCommand} from "../api/CommandQueueCommand";
import {Observable, of} from "rxjs";

export class DataServiceMock
{
  constructor() {
    this.moq = new Mock<CommandQueueDataService>();
    this.returnsValue = 10;
    this.returns = of(this.returnsValue);
    this.moq.setup(s=>
    s.execute(It.IsAny(), It.IsAny()))
      .returns(this.returns);
  }
  private moq : Mock<CommandQueueDataService>;

  get object():CommandQueueDataService
  {
    return this.moq.object();
  }

  verifyExecute(version: number, cmd: CommandQueueCommand):void
  {
    this.moq.verify(s=>
    s.execute(version, cmd));
  }

  returns : Observable<number>;

  returnsValue : number;
}
