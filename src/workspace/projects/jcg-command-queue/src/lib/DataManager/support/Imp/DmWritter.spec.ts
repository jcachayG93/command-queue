
import {ExecuteCommandFunctionFactoryMock} from "../../../test-common/ExecuteCommandFunctionFactoryMock";
import {DmMediatorMock} from "../../../test-common/DmMediatorMock";
import {DmWriter} from "./DmWriter";
import {CommandQueueCommand} from "../../../api/command-queue-command";
import {Mock} from "moq.ts";
import {QueueFactoryDoubleV2} from "../../../test-common/QueueFactoryDoubleV2";

describe("DmWritter",()=>{
  let queueFactory : QueueFactoryDoubleV2;
  let mediator : DmMediatorMock;

  let cmd : CommandQueueCommand;
  beforeEach(()=>{
    queueFactory = new QueueFactoryDoubleV2();
    mediator = new DmMediatorMock();
    cmd = (new Mock<CommandQueueCommand>()).object();

  })
  function createSut():DmWriter
  {
    return new DmWriter(
      queueFactory,
      mediator.object
    );
  }
  it('constructor, creates queue',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      createSut();
      // ********* ASSERT ************
      expect(queueFactory.timesCreateWasCalled).toBe(1);
    });

  it('cancelAllCommands, ' +
    'tells queue to cancel all commands,' +
    'creates new queue' +
    'reads view model',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      // ********* ACT ***************
      sut.cancelAllCommands();
      // ********* ASSERT ************
      expect(queueFactory.returns.test_cancelAllWasCalled).toBeTrue();
      expect(queueFactory.timesCreateWasCalled).toBeGreaterThan(1);
      expect(mediator.verifyRead());
    });
  it('commandsInQueue delegates to queue',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      // ********* ACT ***************
      const result = sut.commandsInQueue;
      // ********* ASSERT ************
      expect(result).toBe(queueFactory
        .returns.pendingCommands.length);
    });

  it('execute command, adds command to queue',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      // ********* ACT ***************
      sut.executeCommand(cmd);
      // ********* ASSERT ************
      expect(queueFactory.returns.test_addArgs!.cmd)
        .toEqual(cmd);

    });
  it('execute command, adds command with errorCallback, that when executed, ' +
    'tells queue to cancel all commands,' +
    'creates new queue' +
    'reads view model' +
    'emits onErrorOccurred',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      let onErrorOcurredArgs : Error | null = null;
      sut.writeErrorOccurred
        .subscribe(e=>onErrorOcurredArgs = e);
      sut.executeCommand(cmd);
      let error = new Error('');
      // ********* ACT ***************
      queueFactory.returns.test_addArgs?.errorCallback(error);
      // ********* ASSERT ************
      expect(queueFactory.returns.test_cancelAllWasCalled).toBeTrue();
      expect(queueFactory.timesCreateWasCalled).toBeGreaterThan(1);
      mediator.verifyRead();
      expect(onErrorOcurredArgs!).toEqual(error);
    });
});
