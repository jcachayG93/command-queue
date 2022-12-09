import {ViewModelImp} from "./ViewModelImp";
import {IDmMediator} from "../DataManager/support/IDmMediator";
import {It, Mock} from "moq.ts";
import {ConcurrencyToken} from "jcg-command-queue";


export class DmMediatorMock
{
  constructor() {
    this.moq = new Mock<IDmMediator>();
    this.moq.setup(s=>s.read()).returns();
    this.moq.setup(s=>s.setCurrentToken(It.IsAny())).returns();
    this.moq.setup(s=>s.viewModel).returns(new ViewModelImp());
    this.moq.setup(s=>s.emitViewModelUpdated()).returns();
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


  verifySetCurrentToken(value:ConcurrencyToken):void
  {
    this.moq.verify(s=>
    s.setCurrentToken(value));
  }

  verifyEmitViewModelUpdated():void
  {
    this.moq.verify(s=>s.emitViewModelUpdated());
  }

}
