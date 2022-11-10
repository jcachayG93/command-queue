import {DataService} from "../api/DataService";
import {It, Mock} from "moq.ts";
import {DataManagerCommand} from "../api/DataManagerCommand";
import {Observable, of} from "rxjs";

export class DataServiceMock
{
  constructor() {
    this.moq = new Mock<DataService>();
    this.returnsValue = 10;
    this.returns = of(this.returnsValue);
    this.moq.setup(s=>
    s.execute(It.IsAny(), It.IsAny()))
      .returns(this.returns);
  }
  private moq : Mock<DataService>;

  get object():DataService
  {
    return this.moq.object();
  }

  verifyExecute(version: number, cmd: DataManagerCommand):void
  {
    this.moq.verify(s=>
    s.execute(version, cmd));
  }

  returns : Observable<number>;

  returnsValue : number;
}
