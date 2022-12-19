import {ViewModelReaderMock} from "../test-common/ViewModelReaderMock";
import {QueueFactoryDoubleV2} from "../test-common/QueueFactoryDoubleV2";
import {UpdateViewModelFunctionFactoryMock} from "../test-common/UpdateViewModelFunctionFactoryMock";
import {CommandQueueCommand} from "../api/command-queue-command";
import {Mock} from "moq.ts";
import {CommandQueueDataManagerV2} from "./CommandQueueDataManagerV2";
import {Logger} from "./support/Logger";
import {finalize, Observable} from "rxjs";
import {AssertViewModelFunctionMock} from "../test-common/AssertViewModelFunctionMock";
import {CommandQueueViewModelReaderService} from "../api/command-queue-view-model-reader.service";
import {QueueFactory} from "../QueueV2/QueueFactory";
import {
  CommandQueueUpdateViewModelFunctionFactoryService
} from "../api/command-queue-update-view-model-function-factory.service";
import {CommandQueueViewModel} from "../api/command-queue-view-model";

describe('CommandQueueDataManagerV2',()=>{
  let reader : ViewModelReaderMock;
  let queueFactory : QueueFactoryDoubleV2;
  let updateViewModelFunctionFactory : UpdateViewModelFunctionFactoryMock;
  let cmd : CommandQueueCommand;
  let commands : CommandQueueCommand[];
  let sut : TestDouble;
  let assertFunction : AssertViewModelFunctionMock;
  beforeEach(()=>{
    reader = new ViewModelReaderMock();
    queueFactory = new QueueFactoryDoubleV2();
    updateViewModelFunctionFactory = new UpdateViewModelFunctionFactoryMock();
    cmd = (new Mock<CommandQueueCommand>()).object();
    commands = [];
    for (let i=0;i<3;i++)
    {
      commands.push(new Mock<CommandQueueCommand>().object());
    }
    sut = new TestDouble(
      reader.object,
      queueFactory,
      updateViewModelFunctionFactory.object,
      new Logger()
    );
    assertFunction = new AssertViewModelFunctionMock();
    sut.viewModel = new Mock<CommandQueueViewModel>().object();
  });
  it('constructor initializes queue',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************

      // ********* ASSERT ************
      expect(sut.queue).toBeTruthy();
    });
  it('initializeQueue does that',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      sut.initializeQueue();
      // ********* ASSERT ************
      expect(sut.queue).toBe(queueFactory.returns);
    });
  it('read view model delegates to reader, sets view-model and current token' +
    'with result, emits onViewModelUpdated and onViewModelReadFromServer',
    () => {
      // ********* ARRANGE ***********
      let onViewModelUpdatedEmited = false;
      let onViewModelReadFromServerEmited = false;
      sut.onViewModelUpdated.subscribe(()=>onViewModelUpdatedEmited = true);
      sut.onViewModelReadFromServer.subscribe(()=>onViewModelReadFromServerEmited = true);

      // ********* ACT ***************
      sut.readViewModel().subscribe();
      // ********* ASSERT ************
      reader.verifyRead();
      expect(sut.viewModel).toEqual(reader.readReturns.viewModel);
      expect(sut.currentToken).toEqual(reader.readReturns.token);
      expect(onViewModelUpdatedEmited).toBeTrue();
      expect(onViewModelReadFromServerEmited).toBeTrue();
    });
  it('cancelAllCommands cancels commands, initialize queue, reads view-model',
    () => {
      // ********* ARRANGE ***********
      sut.test_initializeQueueWasCalled = false;
      // ********* ACT ***************
      sut.cancelAllCommands();
      // ********* ASSERT ************
      expect(queueFactory.returns.test_cancelAllWasCalled).toBeTrue();
      expect(sut.test_initializeQueueWasCalled).toBeTrue();
      expect(sut.test_ReadViewModelWasCalled).toBeTrue();
    });
  it('executeCommand creates update vm function, updates the view-model, emits' +
    'on view-model updated, adds command to the queue with an error callback that invokes ' +
    'cancelAllCommands and emits onWriteErrorOccurred',
    () => {
      // ********* ARRANGE ***********
      let viewModelUpdated = false;
      sut.onViewModelUpdated.subscribe(()=>viewModelUpdated = true);


      // ********* ACT ***************
      sut.executeCommand(cmd);
      // ********* ASSERT ************
      updateViewModelFunctionFactory
        .verifyCreate(cmd);
      updateViewModelFunctionFactory
        .returns
        .verify(sut.viewModel!);
      expect(viewModelUpdated).toBeTrue();

      const error = new Error();

      queueFactory
        .returns
        .test_addArgs?.errorCallback(error);

      expect(sut.test_cancelAllWasCalled).toBeTrue();
      expect(sut.test_ReadViewModelWasCalled).toBeTrue();
    });

  it('executeCommands creates update vm function and updates the view-model for ' +
    'each command',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      sut.executeCommands(commands, assertFunction.object);
      // ********* ASSERT ************
      commands.forEach(cmd=>{
        updateViewModelFunctionFactory
          .verifyCreate(cmd);
        updateViewModelFunctionFactory
          .returns
          .verify(sut.viewModel!);
      });
    });
  it('execute commands asserts the view-model, if assertion fails, cancels all commands, emits on ' +
    'write error occurred, returns',
    () => {
      // ********* ARRANGE ***********
      let writeError : Error | null = null;
      sut.onWriteErrorOccurred.subscribe((e)=>writeError = e);

      const error = new Error();
      assertFunction
        .setupThrowError(error);
      // ********* ACT ***************
        sut.executeCommands(commands,assertFunction.object);
      // ********* ASSERT ************
      expect(sut.test_cancelAllWasCalled).toBeTrue();
      expect(writeError!).toBe(error);
     expect(queueFactory.returns.test_addArgs).toBeFalsy();
    });
  it('execute commands adds the commands to the queue with error callback that cancels all commands ' +
    'and emits on write error occurred',
    () => {
      // ********* ARRANGE ***********
      let writeErrorOccurred = false;
      sut.onWriteErrorOccurred
        .subscribe(()=>writeErrorOccurred = true);
      // ********* ACT ***************
      sut.executeCommands(commands, assertFunction.object);
      // ********* ASSERT ************
      for (let i=0;i<commands.length;i++)
      {
        expect(queueFactory
          .returns
          .test_addArgsSequence[i].cmd).toBe(commands[i]);
      }

      // test the error callback
      const error = new Error();
      queueFactory
        .returns
        .test_addArgsSequence[0]
        .errorCallback(error);

      expect(sut.test_cancelAllWasCalled).toBeTrue();
      expect(writeErrorOccurred).toBeTrue();
    });
});

export class TestDouble extends CommandQueueDataManagerV2
{
  constructor(
    reader : CommandQueueViewModelReaderService,
    queueFactory : QueueFactory,
    updateViewModelFunctionFactory : CommandQueueUpdateViewModelFunctionFactoryService,
    logger : Logger) {
    super(reader, queueFactory
    , updateViewModelFunctionFactory,logger);
  }
  override readViewModel(): Observable<void> {
    return super.readViewModel()
      .pipe(finalize(()=>this.test_ReadViewModelWasCalled = true));
  }

  override initializeQueue() {
    super.initializeQueue();
    this.test_initializeQueueWasCalled = true;
  }

  override cancelAllCommands() {
    super.cancelAllCommands();
    this.test_cancelAllWasCalled = true;

  }

  test_cancelAllWasCalled = false;

  test_ReadViewModelWasCalled = false;

  test_initializeQueueWasCalled = false;
}
