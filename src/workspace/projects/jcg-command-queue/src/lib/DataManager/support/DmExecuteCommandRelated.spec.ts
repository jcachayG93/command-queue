import {QueueFactoryMock} from "../../../../test-common/queue-factory-mock";
import {DmMediatorMock} from "../../../../test-common/DmMediatorMock";
import {DmExecuteCommandRelated} from "./DmExecuteCommandRelated";
import {ViewModelImp} from "../../../../test-common/ViewModelImp";
import {UpdateViewModelFunctionFactoryMock} from "../../../../test-common/update-view-model-factory-mock";
import {DataManagerCommand} from "../../api/DataManagerCommand";
import {Mock} from "moq.ts";
import {DmExecuteCommandFunctionDouble} from "../../../../test-common/DmExecuteCommandFunctionDouble";
import {DataManagerCommandImp} from "../../../../test-common/DataManagerCommandImp";

describe("DmExecuteCommandRelated", ()=>{
  let queueFactory : QueueFactoryMock;
  let mediator : DmMediatorMock;
  let dmExecuteCommandFunctionFactory :
    DmExecuteCommandFunctionDouble;
  let updateViewModelFunctionFactory : UpdateViewModelFunctionFactoryMock;
  beforeEach(()=>{
    queueFactory = new QueueFactoryMock();
    mediator = new DmMediatorMock();
    dmExecuteCommandFunctionFactory =
      new DmExecuteCommandFunctionDouble();
    updateViewModelFunctionFactory = new UpdateViewModelFunctionFactoryMock();
  });
  function createSut():DmExecuteCommandRelated<ViewModelImp>
  {
    return new DmExecuteCommandRelated<ViewModelImp>(
      queueFactory.object,
      mediator.object,
      dmExecuteCommandFunctionFactory,
      updateViewModelFunctionFactory.object
    );
  }
  function randomCommand():DataManagerCommand
  {
    return new DataManagerCommandImp();
  }

  it('constructor creates queue',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      const sut = createSut();
      // ********* ASSERT ************
      expect(queueFactory.createWasCalled()).toBeTrue();
    });


  it('execute command,' +
    'creates updateViewModelFunction,' +
    'gets ViewModel from reader and udpates it,' +
    'emits viewModelUpdated, ' +
    'creates executeCommandFunction,' +
    'adds function to queue',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      const cmd = randomCommand();
      // ********* ACT ***************
      sut.executeCommand(cmd);
      // ********* ASSERT ************
      updateViewModelFunctionFactory.verifyCreate(cmd);
      updateViewModelFunctionFactory
        .returns
        .verify(mediator.object.getViewModel());
      mediator.verifyEmitViewModelUpdated();

     expect(dmExecuteCommandFunctionFactory.createArgs!.cmd).toEqual(cmd);
      expect(dmExecuteCommandFunctionFactory.createArgs!.version).toBe(mediator.getVersionReturns);
      queueFactory
        .returnsFirstTime
        .verifyAdd(dmExecuteCommandFunctionFactory.returns);
    });

  it('execute command, ' +
    'executeCommandFunction returns error,' +
    'cancels all commands in queue,' +
    'reads viewModel,' +
    'creates new queue,' +
    'emits writeErrorOccurred',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      const cmd = randomCommand();
      const error = new Error();
      queueFactory.resetCreateWasCalled();
      let emittedError : Error | null = null;
      sut.writeErrorOccurred.subscribe(e=>emittedError = e);
      sut.executeCommand(cmd);
      // ********* ACT ***************
      dmExecuteCommandFunctionFactory.createArgs!.onErrorCallback(error);
      // ********* ASSERT ************
      queueFactory.returnsFirstTime
        .verifyCancelAll();
      mediator.verifyRead();
      expect(queueFactory.createWasCalled()).toBeTrue(); // this is the second time as the result was reset a few lines above
      expect(emittedError!).toBe(error);
    });

  it('cancelCommands,' +
    'cancel all commands in queue,' +
    'reads viewModel' +
    'create new queue',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      queueFactory.resetCreateWasCalled();
      // ********* ACT ***************
      sut.cancelCommands();
      // ********* ASSERT ************
      mediator.verifyRead();
      expect(queueFactory.createWasCalled()).toBeTrue();
    });

  it('commandsInQueue delegates to queue',
    () => {
      // ********* ARRANGE ***********
      const sut = createSut();
      // ********* ACT ***************
      let result = sut.commandsInQueue;
      // ********* ASSERT ************
      expect(result).toBe(queueFactory.returnsFirstTime.object.commandsInQueue);
    });


});
