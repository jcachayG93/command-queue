import {Mock} from "moq.ts";
import {IDmMediator} from "../src/lib/DataManager/support/IDmMediator";

export class IDmMediatorMock
{
  constructor() {
    this.moq = new Mock<IDmMediator>();
    this.moq.setup(s=>s.read()).returns();
    this.moq.setup(s=>s.setVersion(value)).returns();
    this.moq.setup(s=>s.getVersion()).returns(this.getVersionReturns);
  }
  private moq : Mock<IDmMediator>;

  get object():IDmMediator
  {
    return this.moq.object();
  }

  verifyRead():void
  {
    this.moq.verify(s=>s.read());
  }

  verifySetVersion(value:number):void
  {
    this.moq.verify(s=>s.setVersion(value));
  }

  verifyGetVersion():void
  {
    this.moq.verify(s=>s.getVersion());
  }

  getVersionReturns = 10;
}
