import {DmReaderMock} from "../test-common/DmReaderMock";
import {DmWriterMock} from "../test-common/DmWritterMock";
import {CommandQueueDataManagerImp} from "./CommandQueueDataManagerImp";
import {ViewModelImp} from "../test-common/ViewModelImp";
import {DataManagerCommand} from "../api/DataManagerCommand";
import {Mock} from "moq.ts";

describe("CommandQueueDataManagerImp",()=>{
  let reader : DmReaderMock;
  let writer : DmWriterMock;
  let sut : CommandQueueDataManagerImp<ViewModelImp>;
  let cmd : DataManagerCommand;
  beforeEach(()=>{
    reader = new DmReaderMock();
    writer = new DmWriterMock();
    sut = new CommandQueueDataManagerImp<ViewModelImp>(reader.object, writer.object);
    cmd = (new Mock<DataManagerCommand>()).object();
  });
  it('cancelCommands delegates to writer',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      sut.cancelCommands();
      // ********* ASSERT ************
      writer.verifyCancelAllCommands();
    });
  it('get commandsInQueue delegates to writer',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      const result = sut.commandsInQueue;
      // ********* ASSERT ************
      expect(result).toBe(writer.object.commandsInQueue);

    });
  it('executeCommand, delegates to writer',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      sut.executeCommand(cmd)
      // ********* ASSERT ************
      writer.verifyExecuteCommand(cmd);
    });
  it('onViewModelUpdated, delegates to reader',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      const result = sut.onViewModelUpdated;
      // ********* ASSERT ************
      expect(result)
        .toBe(reader.object.onViewModelUpdated);
    });
  it('get viewModel delegates to reader',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      const result = sut.viewModel;
      // ********* ASSERT ************
      expect(result).toBe(reader.object.viewModel);
    });
  it('writerErrorOcurred delegates to writer',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      const result = sut.writeErrorOccurred;
      // ********* ASSERT ************
      expect(result).toBe(writer.object.writeErrorOccurred);
    });
  it('get modelVersion delegates to dmReader',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      const result = sut.modelVersion;
      // ********* ASSERT ************
      expect(result).toBe(reader.object.version);
    });
});
