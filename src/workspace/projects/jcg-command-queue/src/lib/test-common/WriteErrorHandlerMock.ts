import {It, Mock} from "moq.ts";
import {WriteErrorHandler} from "../DataManager/support/Imp/WriteErrorHandler";
import {IDmWriter} from "../DataManager/support/IDmWriter";

export class WriteErrorHandlerMock
{
  constructor() {
    this.moq = new Mock<WriteErrorHandler>();
    this.moq.setup(s=>
    s.handle(It.IsAny(), It.IsAny()))
      .returns();
  }
  private moq : Mock<WriteErrorHandler>;

  get object():WriteErrorHandler
  {
    return this.moq.object();
  }

  verifyHandle(e:Error, dmWriter:IDmWriter):void
  {
    this.moq.verify(s=>
    s.handle(e, dmWriter));
  }

}
