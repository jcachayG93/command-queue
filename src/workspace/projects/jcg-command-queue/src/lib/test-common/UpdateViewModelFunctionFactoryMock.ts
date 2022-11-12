import {ViewModelImp} from "./ViewModelImp";
import {UpdateViewModelFunctionFactoryService} from "../api/update-viewModel-function-factory.service";
import {It, Mock} from "moq.ts";
import {CommandQueueCommand} from "../api/CommandQueueCommand";
import {IUpdateViewModelFunction} from "../api/IUpdateViewModelFunction";

export class UpdateViewModelFunctionFactoryMock
{
  constructor() {
    this.moq = new Mock<UpdateViewModelFunctionFactoryService>();
    this.returns = new UpdateViewModelFunctionMock();
    this.moq.setup(s=>s.create(It.IsAny()))
      .returns(this.returns.object);
  }
  private moq : Mock<UpdateViewModelFunctionFactoryService>;

  get object():UpdateViewModelFunctionFactoryService
  {
    return this.moq.object();
  }

  verifyCreate(cmd:CommandQueueCommand)
  {
    this.moq.verify(s=>
    s.create(cmd));
  }

  returns : UpdateViewModelFunctionMock;

}
export class UpdateViewModelFunctionMock
{
  constructor() {
    this.moq = new Mock<IUpdateViewModelFunction>();
    this.moq.setup(instance=>
    instance(It.IsAny())).returns();
  }
  private moq : Mock<IUpdateViewModelFunction>;

  get object():IUpdateViewModelFunction
  {
    return this.moq.object();
  }

  verify(vm:ViewModelImp)
  {
    this.moq.verify(instance => instance(vm));
  }


}
