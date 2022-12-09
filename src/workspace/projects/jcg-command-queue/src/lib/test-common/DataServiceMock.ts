import {CommandQueueDataService} from "../api/command-queue-data.service";
import {It, Mock} from "moq.ts";
import {CommandQueueCommand} from "../api/command-queue-command";
import {Observable, of} from "rxjs";
import {ConcurrencyToken} from "jcg-command-queue";
import {ConcurrencyTokenImp} from "./ConcurrencyTokenImp";

export class DataServiceMock
{
  constructor() {
    this.moq = new Mock<CommandQueueDataService>();
    this.returnsValue = new ConcurrencyTokenImp();
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

  verifyExecute(currentToken : ConcurrencyToken, cmd: CommandQueueCommand):void
  {
    this.moq.verify(s=>
    s.execute(currentToken, cmd));
  }



  returns : Observable<ConcurrencyToken>;

  returnsValue : ConcurrencyToken;
}
