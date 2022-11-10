import {
  DmExecuteCommandFunctionFactory
} from "../src/lib/DataManager/support/DmExecuteCommandFunctionFactory";
import {It, Mock} from "moq.ts";
import {ViewModelImp} from "./ViewModelImp";
import {IExecuteCommandFunction} from "../src/lib/DataManager/support/IExecuteCommandFunction";
import {DataManagerCommand} from "../src/lib/api/DataManagerCommand";

export class DmExecuteCommandFunctionFactoryMock
{
  constructor() {
    this.moq = new Mock<DmExecuteCommandFunctionFactory<ViewModelImp>>();
    this.return = new Mock<IExecuteCommandFunction>().object();
    this.moq.setup(s=>
    s.create(It.IsAny(),It.IsAny()))
      .returns(this.return);
  }
  private moq : Mock<DmExecuteCommandFunctionFactory<ViewModelImp>>;

  get object():DmExecuteCommandFunctionFactory<ViewModelImp>
  {
    return this.moq.object();
  }

  return : IExecuteCommandFunction;

  verifyCreate(cmd: DataManagerCommand, viewModel : ViewModelImp)
  {
    this.moq.verify(s=>
    s.create(cmd,viewModel));
  }

}

