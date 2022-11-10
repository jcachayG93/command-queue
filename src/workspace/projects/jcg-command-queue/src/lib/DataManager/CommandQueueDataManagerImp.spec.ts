import {QueueFactoryMock} from "../../../test-common/queue-factory-mock";
import {ViewModelReaderMock} from "../../../test-common/view-model-reader-mock";
import {CommandQueueDataManager} from "../api/CommandQueueDataManager";
import {ViewModelImp} from "../../../test-common/ViewModelImp";
import {CommandQueueDataManagerImp} from "./CommandQueueDataManagerImp";
import {
  DataManagerExecuteCommandFunctionFactoryMock
} from "../../../test-common/DataManagerExecuteCommandFunctionFactoryMock";
import {DataManagerCommandImp} from "../../../test-common/DataManagerCommandImp";
import {ViewModelNotReadError} from "../api/errors/view-model-not-read-error";

describe("CommandQueueDataManager",()=>{
  let queueFactory : QueueFactoryMock;
  let executeCommandFunctionFactory : DataManagerExecuteCommandFunctionFactoryMock;
  let reader : ViewModelReaderMock;

  beforeEach(()=>{
    queueFactory = new QueueFactoryMock();
    executeCommandFunctionFactory =
      new DataManagerExecuteCommandFunctionFactoryMock();
    reader = new ViewModelReaderMock();

  });
  function createSut():CommandQueueDataManagerImp<ViewModelImp>
  {
    return new CommandQueueDataManagerImp<ViewModelImp>(
      queueFactory.object,
      executeCommandFunctionFactory.object,
      reader.object
    );
  }
  function createSutAndRead():CommandQueueDataManagerImp<ViewModelImp>
  {
    let result = createSut();
    result.readViewModel().subscribe();
    return result;
  }
  function randomCommand():DataManagerCommandImp
  {
    return new DataManagerCommandImp();
  }
  it('constructor, creates queue',
    () => {
      // ********* ARRANGE ***********
      // ********* ACT ***************
      let sut =
        new CommandQueueDataManagerImp<ViewModelImp>(
          queueFactory.object,
          executeCommandFunctionFactory.object,
          reader.object
        );
      // ********* ASSERT ************
      expect(queueFactory.createWasCalled()).toBeTrue();
    });

  it('commandsInQueue delegates to queue',
    () => {
      // ********* ARRANGE ***********
      let sut = createSut();
      // ********* ACT ***************
      let result = sut.commandsInQueue;
      // ********* ASSERT ************
      expect(result).toBe(queueFactory.returnsFirstTime.object.commandsInQueue);
    });

  it('readViewModel delegates to ViewModelReader',
    () => {
      // ********* ARRANGE ***********
      let sut = createSut();
      // ********* ACT ***************
      sut.readViewModel().subscribe();
      // ********* ASSERT ************
      reader.verifyRead();

      expect(sut.viewModel)
        .toBe(reader.returns);

    });

  it('readViewModel emits onViewModelUpdated',
    () => {
      // ********* ARRANGE ***********
      let sut = createSut();
      let wasRead = false;
      sut.onViewModelUpdated
        .subscribe(()=>{
          wasRead = true;
        })
      // ********* ACT ***************
      sut.readViewModel().subscribe();
      // ********* ASSERT ************
      expect(wasRead).toBeTrue();
    });

  it('executeCommand, before reading ' +
    'ViewModel, throws error: ViewModelNotReadError',
    () => {
      // ********* ARRANGE ***********
      let sut = createSut();
      // ********* ACT ***************
      let f = ()=>{sut.executeCommand(randomCommand())};
      // ********* ASSERT ************

      expect(f).toThrowMatching(e=>e instanceof ViewModelNotReadError);

    });
  it('executeCommand, creates command function, ' +
    'adds it to queue',
    () => {
      // ********* ARRANGE ***********
      let sut = createSutAndRead();
      let command = randomCommand();
      // ********* ACT ***************
      sut.executeCommand(command);
      // ********* ASSERT ************
      executeCommandFunctionFactory
        .verifyCreate(sut.viewModel as ViewModelImp,sut);

     queueFactory
        .returnsFirstTime.verifyAdd(executeCommandFunctionFactory.return);
    });

  it('onConcurrencyVersionMismatch, ' +
    'cancels all queue commands, ' +
    'creates a new queue,' +
    'read the view model, emits view model updated, ' +
    'emits ConcurrencyVersionMismatchOcurred subject',
    () => {
      // ********* ARRANGE ***********
      let sut = createSutAndRead();
      queueFactory.resetCreateWasCalled();
      let viewModelWasUpdated = false;
      let concurrencyVersionMismatchOcurred = false;
      sut.ConcurrencyVersionMismatchOccurred
        .subscribe(()=>concurrencyVersionMismatchOcurred = true);
      sut.onViewModelUpdated.subscribe(
        ()=>viewModelWasUpdated = true);
      // ********* ACT ***************
      sut.onConcurrencyVersionMismatch();
      // ********* ASSERT ************
      queueFactory
        .returnsFirstTime
        .verifyCancelAll();
      expect(queueFactory.createWasCalled()).toBeTrue();
      expect(reader.verifyRead())
      reader.verifyReadTwice();
      expect(viewModelWasUpdated).toBeTrue();
      expect(concurrencyVersionMismatchOcurred)
        .toBeTrue();
    });

  it('cancelAllCommands, cancels all queue commands, ' +
    'creates a new queue,' +
    'read the view model,' +
    'and emits view model updated',
    () => {
      // ********* ARRANGE ***********
      let sut = createSutAndRead();
      queueFactory.resetCreateWasCalled();
      let viewModelWasUpdated = false;
      sut.onViewModelUpdated.subscribe(
        ()=>viewModelWasUpdated = true);
      // ********* ACT ***************
      sut.onConcurrencyVersionMismatch();
      // ********* ASSERT ************
      queueFactory
        .returnsFirstTime
        .verifyCancelAll();
      expect(queueFactory.createWasCalled()).toBeTrue();
      expect(reader.verifyRead())
      reader.verifyReadTwice();
      expect(viewModelWasUpdated).toBeTrue();

    });
});
