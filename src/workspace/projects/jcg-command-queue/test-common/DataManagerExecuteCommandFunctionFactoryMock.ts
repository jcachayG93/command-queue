import {
  DataManagerExecuteCommandFunctionFactory
} from "../src/lib/DataManager/support/DataManagerExecuteCommandFunctionFactory";
import {It, Mock} from "moq.ts";
import {ViewModelImp} from "./ViewModelImp";
import {Observable} from "rxjs";
import {IConcurrencyVersionMismatchErrorHandler} from "../src/lib/DataManager/IConcurrencyVersionMismatchErrorHandler";

export class DataManagerExecuteCommandFunctionFactoryMock
{
  constructor() {
    this.moq = new Mock<DataManagerExecuteCommandFunctionFactory<ViewModelImp>>();
    this.return = ()=>new Observable<void>();
    this.moq.setup(s=>
    s.create(It.IsAny(),It.IsAny()))
      .returns(this.return);
  }
  private moq : Mock<DataManagerExecuteCommandFunctionFactory<ViewModelImp>>;

  get object():DataManagerExecuteCommandFunctionFactory<ViewModelImp>
  {
    return this.moq.object();
  }

  return : ()=>Observable<void>;

  verifyCreate(viewModel : ViewModelImp,
               errorHandler : IConcurrencyVersionMismatchErrorHandler)
  {
    this.moq.verify(s=>
    s.create(viewModel, errorHandler));
  }

}

