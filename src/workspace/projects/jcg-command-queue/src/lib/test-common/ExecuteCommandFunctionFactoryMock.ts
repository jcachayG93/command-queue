import {IExecuteCommandFunctionFactory} from "../DataManager/support/IExecuteCommandFunctionFactory";
import {It, Mock} from "moq.ts";
import {DataManagerCommand} from "../api/DataManagerCommand";
import {IExecuteCommandFunction} from "../DataManager/support/IExecuteCommandFunction";


export class ExecuteCommandFunctionFactoryMock
{
  constructor() {
    this.moq = new Mock<IExecuteCommandFunctionFactory>();
    this.returns = (new Mock<IExecuteCommandFunction>()).object();
    this.moq.setup(s=>
    s.create(It.IsAny())).returns(this.returns);
  }
  private moq : Mock<IExecuteCommandFunctionFactory>;

  get object(): IExecuteCommandFunctionFactory
  {
    return this.moq.object();
  }

  verifyCreate(cmd:DataManagerCommand):void
  {
    this.moq.verify(s=>s.create(cmd));
  }

  returns : IExecuteCommandFunction;

}
