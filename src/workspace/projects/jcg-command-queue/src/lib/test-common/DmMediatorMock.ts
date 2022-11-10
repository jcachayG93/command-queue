import {ViewModelImp} from "./ViewModelImp";
import {IDmMediator} from "../DataManager/support/IDmMediator";
import {It, Mock} from "moq.ts";


export class DmMediatorMock
{
  constructor() {
    this.moq = new Mock<IDmMediator<ViewModelImp>>();
    this.moq.setup(s=>s.read()).returns();
    this.moq.setup(s=>s.setVersion(It.IsAny())).returns();
    this.moq.setup(s=>s.version).returns(10);
    this.moq.setup(s=>s.viewModel).returns(new ViewModelImp());
    this.moq.setup(s=>s.emitViewModelUpdated()).returns();
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
    this.moq.setup(s=>s.setVersion(value));
  }

  verifyEmitViewModelUpdated():void
  {
    this.moq.verify(s=>s.emitViewModelUpdated());
  }

}
