
import {DmMediatorMock} from "../../../test-common/DmMediatorMock";
import {DmWriter} from "./DmWriter";
import {CommandQueueCommand} from "../../../api/command-queue-command";
import {Mock} from "moq.ts";
import {QueueFactoryDoubleV2} from "../../../test-common/QueueFactoryDoubleV2";
import {UpdateViewModelFunctionFactoryMock} from "../../../test-common/UpdateViewModelFunctionFactoryMock";
import {WriteErrorHandlerMock} from "../../../test-common/WriteErrorHandlerMock";
import {AssertViewModelFunctionMock} from "../../../test-common/AssertViewModelFunctionMock";

describe("DmWritter",()=>{
  let queueFactory : QueueFactoryDoubleV2;
  let mediator : DmMediatorMock;
  let updateViewModelFunctionFactory : UpdateViewModelFunctionFactoryMock;
  let writeErrorHandler : WriteErrorHandlerMock;
  let cmd : CommandQueueCommand;
  let cmds : CommandQueueCommand[];
  beforeEach(()=>{
    queueFactory = new QueueFactoryDoubleV2();
    mediator = new DmMediatorMock();
    writeErrorHandler = new WriteErrorHandlerMock();
    updateViewModelFunctionFactory = new UpdateViewModelFunctionFactoryMock();
    cmd = (new Mock<CommandQueueCommand>()).object();
    cmds = [];
    for (let i=0;i<3;i++)
    {
      cmds.push((new Mock<CommandQueueCommand>()).object());
    }
  })
  function createSut():DmWriter
  {
    return new DmWriter(
      queueFactory,
      mediator.object,
      updateViewModelFunctionFactory.object,
      writeErrorHandler.object
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

  it('initializeQueue does that',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      // ********* ACT ***************
      sut.initializeQueue();
      // ********* ASSERT ************
      expect(sut.queue).toBe(queueFactory.returns);
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

  it('execute command, adds command to queue with callback that ' +
    'delegates to error handler',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      const error = new Error();
      // ********* ACT ***************
      sut.executeCommand(cmd);
      // ********* ASSERT ************
      expect(queueFactory.returns.test_addArgs!.cmd)
        .toEqual(cmd);

      queueFactory
        .returns
        .test_addArgs
        ?.errorCallback(error);

        writeErrorHandler
          .verifyHandle(error, sut);
    });

  it('execute commands creates update view-model function and update the view-model' +
    'for each command',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      // ********* ACT ***************
      sut.executeCommands(cmds,e=>{});
      // ********* ASSERT ************
      cmds.forEach(cmd=>{
        updateViewModelFunctionFactory
          .verifyCreate(cmd);
        updateViewModelFunctionFactory
          .returns
          .verify(mediator
            .object
            .viewModel!);

      });
    });
  it('execute commands, assert the view-model. If an error is thrown, ' +
    'delegates to' +
    ' error handler',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      const assertFunction = new AssertViewModelFunctionMock();
      const error = new Error();
      assertFunction.setupThrowError(error);
      // ********* ACT ***************
      sut.executeCommands(cmds,assertFunction.object);
      // ********* ASSERT ************
      assertFunction
        .verify(mediator.object.viewModel!);

      writeErrorHandler
        .verifyHandle(error, sut);
    });
  it('execute commands, adds commands to the queue with error callback that ' +
    'delegates to write error handler',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      const error = new Error();
      // ********* ACT ***************
      sut.executeCommands(cmds,vm=>{});
      // ********* ASSERT ************
      for (let i=0;i<cmds.length;i++)
      {
        const args = queueFactory
          .returns
          .test_addArgsSequence[i];
        expect(args.cmd)
          .toBe(cmds[i]);
        if (i==0)
        {
          args.errorCallback(error);
          writeErrorHandler
            .verifyHandle(error, sut);
        }
      }
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
