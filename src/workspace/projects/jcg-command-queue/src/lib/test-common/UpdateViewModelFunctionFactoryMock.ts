import {ViewModelImp} from "./ViewModelImp";
import {CommandQueueUpdateViewModelFunctionFactoryService} from "../api/command-queue-update-view-model-function-factory.service";
import {It, Mock} from "moq.ts";
import {CommandQueueCommand} from "../api/command-queue-command";
import {IUpdateViewModelFunction} from "../api/IUpdateViewModelFunction";

export class UpdateViewModelFunctionFactoryMock
{
  constructor() {
    this.moq = new Mock<CommandQueueUpdateViewModelFunctionFactoryService>();
    this.returns = new UpdateViewModelFunctionMock();
    this.moq.setup(s=>s.create(It.IsAny()))
      .returns(this.returns.object);
  }
  private moq : Mock<CommandQueueUpdateViewModelFunctionFactoryService>;

  get object():CommandQueueUpdateViewModelFunctionFactoryService
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
