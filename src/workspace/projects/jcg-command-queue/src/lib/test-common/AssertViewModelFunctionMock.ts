import {It, Mock} from "moq.ts";
import {IAssertViewModelFunction} from "../api/IAssertViewModelFunction";
import {CommandQueueViewModel} from "../api/command-queue-view-model";

export class AssertViewModelFunctionMock
{
  constructor() {
    this.moq = new Mock<IAssertViewModelFunction>();
    this.moq.setup(i=>i(It.IsAny())).returns();
  }
  private moq : Mock<IAssertViewModelFunction>;

  get object():IAssertViewModelFunction
  {
    return this.moq.object();
  }

  verify(vm:CommandQueueViewModel):void
  {
    this.moq.verify(i =>
    i(vm));
  }

  setupThrowError(e:Error):void
  {
    this
      .moq
      .setup(i=>i(It.IsAny()))
      .callback(()=>{throw e});
  }



}
