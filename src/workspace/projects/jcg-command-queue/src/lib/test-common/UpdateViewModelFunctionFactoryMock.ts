import {ViewModelImp} from "./ViewModelImp";
import {UpdateViewModelFunctionFactory} from "../api/UpdateViewModelFunctionFactory";
import {It, Mock} from "moq.ts";
import {DataManagerCommand} from "../api/DataManagerCommand";
import {IUpdateViewModelFunction} from "../api/IUpdateViewModelFunction";

export class UpdateViewModelFunctionFactoryMock
{
  constructor() {
    this.moq = new Mock<UpdateViewModelFunctionFactory<ViewModelImp>>();
    this.returns = new UpdateViewModelFunctionMock();
    this.moq.setup(s=>s.create(It.IsAny()))
      .returns(this.returns.object);
  }
  private moq : Mock<UpdateViewModelFunctionFactory<ViewModelImp>>;

  get object():UpdateViewModelFunctionFactory<ViewModelImp>
  {
    return this.moq.object();
  }

  verifyCreate(cmd:DataManagerCommand)
  {
    this.moq.verify(s=>
    s.create(cmd));
  }

  returns : UpdateViewModelFunctionMock;

}
export class UpdateViewModelFunctionMock
{
  constructor() {
    this.moq = new Mock<IUpdateViewModelFunction<ViewModelImp>>();
    this.moq.setup(instance=>
    instance(It.IsAny())).returns();
  }
  private moq : Mock<IUpdateViewModelFunction<ViewModelImp>>;

  get object():IUpdateViewModelFunction<ViewModelImp>
  {
    return this.moq.object();
  }

  verify(vm:ViewModelImp)
  {
    this.moq.verify(instance => instance(vm));
  }


}
