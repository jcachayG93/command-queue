import {DmWriterMock} from "../../../test-common/DmWritterMock";
import {WriteErrorHandler} from "./WriteErrorHandler";

describe('WriteErrorHandler',()=>{
  let dmWriter : DmWriterMock;
  let sut : WriteErrorHandler;
  beforeEach(()=>{
    dmWriter = new DmWriterMock();
    sut = new WriteErrorHandler();
  });
  it('cancels All pending commands',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      sut.handle(new Error(), dmWriter.object);
      // ********* ASSERT ************
      dmWriter.verifyCancelAllCommands();
    });

  it('emits writeErrorOccurred',
    () => {
      // ********* ARRANGE ***********
      const e = new Error();
      // ********* ACT ***************
      sut.handle(e, dmWriter.object);
      // ********* ASSERT ************
      dmWriter
        .verifyEmitWriteErrorOccurred(e);
    });
});
