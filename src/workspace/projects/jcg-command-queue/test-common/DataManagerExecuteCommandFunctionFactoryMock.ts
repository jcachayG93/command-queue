import {
  DataManagerExecuteCommandFunctionFactory
} from "../src/lib/DataManager/support/DataManagerExecuteCommandFunctionFactory";
import {It, Mock} from "moq.ts";
import {ViewModelImp} from "./ViewModelImp";
import {Observable} from "rxjs";
import {IConcurrencyVersionMismatchErrorHandler} from "../src/lib/DataManager/IConcurrencyVersionMismatchErrorHandler";
import {IExecuteCommandFunction} from "../src/lib/DataManager/support/IExecuteCommandFunction";

export class DataManagerExecuteCommandFunctionFactoryMock
{
  constructor() {
    this.moq = new Mock<DataManagerExecuteCommandFunctionFactory<ViewModelImp>>();
    this.return = new Mock<IExecuteCommandFunction>().object();
    this.moq.setup(s=>
    s.create(It.IsAny(),It.IsAny()))
      .returns(this.return);
  }
  private moq : Mock<DataManagerExecuteCommandFunctionFactory<ViewModelImp>>;

  get object():DataManagerExecuteCommandFunctionFactory<ViewModelImp>
  {
    return this.moq.object();
  }

  return : IExecuteCommandFunction;

  verifyCreate(viewModel : ViewModelImp,
               errorHandler : IConcurrencyVersionMismatchErrorHandler)
  {
    this.moq.verify(s=>
    s.create(viewModel, errorHandler));
  }

}

