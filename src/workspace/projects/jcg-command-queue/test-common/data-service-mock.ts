import {DataManagerCommand} from "../src/lib/api/DataManagerCommand";
import {DataService} from "../src/lib/api/DataService";
import {It, Mock} from "moq.ts";
import {of} from "rxjs";

export class DataServiceMock
{
  constructor() {
    this.moq = new Mock<DataService>();
    this.moq.setup(s=>
    s.execute(It.IsAny(), It.IsAny()))
      .returns(of(this.versionReturns));
  }
  private moq : Mock<DataService>;

  get object():DataService
  {
    return this.moq.object();
  }

  verifyExecute(version:number, cmd:DataManagerCommand):void
  {
    this.moq.verify(s=>
    s.execute(version, cmd));
  }

  versionReturns = 10;
}
