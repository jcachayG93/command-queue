import {It, Mock} from "moq.ts";
import {IDmMediator} from "../src/lib/DataManager/support/IDmMediator";
import {ViewModelImp} from "./ViewModelImp";

export class DmMediatorMock
{
  constructor() {
    this.moq = new Mock<IDmMediator<ViewModelImp>>();
    this.moq.setup(s=>s.read()).returns();
    this.moq.setup(s=>s.setVersion(It.IsAny())).returns();
    this.moq.setup(s=>s.getVersion()).returns(this.getVersionReturns);
    this.moq.setup(s=>s.emitViewModelUpdated()).returns();
    this.moq.setup(s=>s.getViewModel())
      .returns(new ViewModelImp());
  }
  private moq : Mock<IDmMediator<ViewModelImp>>;

  get object():IDmMediator<ViewModelImp>
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

  verifyEmitViewModelUpdated():void
  {
    this.moq.verify(s=>s.emitViewModelUpdated());
  }

  getVersionReturns = 10;
}
