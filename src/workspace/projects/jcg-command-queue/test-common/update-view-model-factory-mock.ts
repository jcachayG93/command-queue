import {It, Mock} from "moq.ts";
import {UpdateViewModelFunctionFactory} from "../src/lib/api/UpdateViewModelFunctionFactory";
import {ViewModelImp} from "./ViewModelImp";
import {DataManagerCommand} from "../src/lib/api/DataManagerCommand";

export class UpdateViewModelFunctionFactoryMock
{
  constructor() {
    this.moq = new Mock<UpdateViewModelFunctionFactory<ViewModelImp>>();
    this.returns = new UpdateViewModelFunctionMock();
    this.moq.setup(s=>
    s.create(It.IsAny()))
      .returns(this.returns.object);
  }
  private moq : Mock<UpdateViewModelFunctionFactory<ViewModelImp>>;

  get object():UpdateViewModelFunctionFactory<ViewModelImp>
  {
    return this.moq.object();
  }

  verifyCreate(cmd: DataManagerCommand)
  {
    this.moq.verify(s=>
    s.create(cmd));
  }

  returns : UpdateViewModelFunctionMock;

}

export class UpdateViewModelFunctionMock
{
  constructor() {
    this.moq = new Mock<ITestFunction>();
    this.moq.setup(instance =>
    instance(It.IsAny())).returns();
  }
  private moq : Mock<ITestFunction>;

  get object():(vm: ViewModelImp) => void
  {
    return this.moq.object();
  }

  verify(vm:ViewModelImp):void
  {
    this.moq.verify(i=>
    i(vm));
  }

}

interface ITestFunction {
  (arg: ViewModelImp): void;
}
