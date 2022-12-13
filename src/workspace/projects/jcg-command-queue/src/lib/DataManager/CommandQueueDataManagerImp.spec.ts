import {DmReaderMock} from "../test-common/DmReaderMock";
import {DmWriterMock} from "../test-common/DmWritterMock";
import {CommandQueueDataManagerImp} from "./CommandQueueDataManagerImp";
import {ViewModelImp} from "../test-common/ViewModelImp";
import {CommandQueueCommand} from "../api/command-queue-command";
import {Mock} from "moq.ts";
import {Logger} from "./support/Logger";

describe("CommandQueueDataManagerImp",()=>{
  let reader : DmReaderMock;
  let writer : DmWriterMock;
  let sut : CommandQueueDataManagerImp;
  let cmd : CommandQueueCommand;
  beforeEach(()=>{
    reader = new DmReaderMock();
    writer = new DmWriterMock();
    sut = new CommandQueueDataManagerImp(reader.object, writer.object, new Logger());
    cmd = (new Mock<CommandQueueCommand>()).object();
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
  it('onViewModelChanged, delegates to reader',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      const result = sut.onViewModelChanged;
      // ********* ASSERT ************
      expect(result)
        .toBe(reader.object.onViewModelChanged);
    });
  it('onViewModelReadeFromSelver, delegates to reader',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      const result = sut.onViewModelReadFromServer;
      // ********* ASSERT ************
      expect(result)
        .toBe(reader.object.onViewModelReadFromServer);
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
      const result = sut.onWriteErrorOccurred;
      // ********* ASSERT ************
      expect(result).toBe(writer.object.writeErrorOccurred);
    });
  it('get current token delegates to reader',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      const result = sut.currentToken;
      // ********* ASSERT ************
      expect(result).toBe(reader.object.currentToken);
    });
  it('pendingCommands delegates to writer',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      const result = sut.pendingCommands;
      // ********* ASSERT ************

      expect(result).toBe(writer.object.pendingCommands);
    });
});
