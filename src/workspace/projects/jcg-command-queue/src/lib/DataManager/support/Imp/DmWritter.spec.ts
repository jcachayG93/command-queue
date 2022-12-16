
import {ExecuteCommandFunctionFactoryMock} from "../../../test-common/ExecuteCommandFunctionFactoryMock";
import {DmMediatorMock} from "../../../test-common/DmMediatorMock";
import {DmWriter} from "./DmWriter";
import {CommandQueueCommand} from "../../../api/command-queue-command";
import {Mock} from "moq.ts";
import {QueueFactoryDoubleV2} from "../../../test-common/QueueFactoryDoubleV2";
import {UpdateViewModelFunctionFactoryMock} from "../../../test-common/UpdateViewModelFunctionFactoryMock";

describe("DmWritter",()=>{
  let queueFactory : QueueFactoryDoubleV2;
  let mediator : DmMediatorMock;
  let updateViewModelFunctionFactory : UpdateViewModelFunctionFactoryMock;
  let cmd : CommandQueueCommand;
  beforeEach(()=>{
    queueFactory = new QueueFactoryDoubleV2();
    mediator = new DmMediatorMock();
    updateViewModelFunctionFactory = new UpdateViewModelFunctionFactoryMock();
    cmd = (new Mock<CommandQueueCommand>()).object();

  })
  function createSut():DmWriter
  {
    return new DmWriter(
      queueFactory,
      mediator.object,
      updateViewModelFunctionFactory.object
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
  it('executeCommand creates update view model function, uses it to update' +
    'the view-moded, emits view-model updated',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      // ********* ACT ***************
      sut.executeCommand(cmd);
      // ********* ASSERT ************
      updateViewModelFunctionFactory
        .verifyCreate(cmd);
      updateViewModelFunctionFactory
        .returns
        .verify(mediator.object.viewModel!);
      mediator.verifyEmitViewModelUpdated();
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

  it('get pendingCommands delegates to queue',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      // ********* ACT ***************
      const result = sut.pendingCommands;
      // ********* ASSERT ************
      expect(result).toBe(queueFactory
        .returns.pendingCommands);
    });
});
