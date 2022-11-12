import {DmMediatorMock} from "../../../test-common/DmMediatorMock";
import {UpdateViewModelFunctionFactoryMock} from "../../../test-common/UpdateViewModelFunctionFactoryMock";
import {ExecuteCommandFunctionFactory} from "./ExecuteCommandFunctionFactory";
import {ViewModelImp} from "../../../test-common/ViewModelImp";
import {CommandQueueCommand} from "../../../api/CommandQueueCommand";
import {Mock} from "moq.ts";
import {DataServiceMock} from "../../../test-common/DataServiceMock";

describe("ExecuteCommandFunctionFactory",()=>{
  let mediator : DmMediatorMock;
  let updateViewModelFunctionFactory : UpdateViewModelFunctionFactoryMock;
  let dataService : DataServiceMock;
  let cmd : CommandQueueCommand;
  let sut : ExecuteCommandFunctionFactory<ViewModelImp>;
  beforeEach(()=>{
    mediator = new DmMediatorMock();
    updateViewModelFunctionFactory = new UpdateViewModelFunctionFactoryMock();
    dataService = new DataServiceMock();
    cmd = (new Mock<CommandQueueCommand>()).object();
    sut = new ExecuteCommandFunctionFactory<ViewModelImp>(
      mediator.object,updateViewModelFunctionFactory.object,
      dataService.object);
  });


  it('creates an updateViewModelFunction',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      sut.create(cmd);
      // ********* ASSERT ************
      updateViewModelFunctionFactory
        .verifyCreate(cmd);
    });

  it('updates the viewModel',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      sut.create(cmd);
      // ********* ASSERT ************
      updateViewModelFunctionFactory
        .returns.verify(mediator.object.viewModel!);
    });
  it('returns function that creates an observable that calls the dataService ' +
    'passing the command and model version',
    (done) => {
      // ********* ARRANGE ***********
      let f = sut.create(cmd);

      // ********* ACT ***************
      f().subscribe({
        complete:()=>{
          // ********* ASSERT ************
          dataService.verifyExecute(mediator.object.version,cmd);
          done();
        }
      });


    });
  it('when resolved, the observable sets the model version with the dataService response',
    (done) => {
      // ********* ARRANGE ***********
      let f = sut.create(cmd);

      // ********* ACT ***************
      f().subscribe({
        complete:()=>{
          // ********* ASSERT ************
          mediator.verifySetVersion(dataService.returnsValue);
          done();
        }
      });

    });

});
