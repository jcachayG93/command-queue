import {DmMediatorMock} from "../../../test-common/DmMediatorMock";
import {ExecuteCommandFunctionFactory} from "./ExecuteCommandFunctionFactory";
import {ViewModelImp} from "../../../test-common/ViewModelImp";
import {CommandQueueCommand} from "../../../api/command-queue-command";
import {Mock} from "moq.ts";
import {DataServiceMock} from "../../../test-common/DataServiceMock";

describe("ExecuteCommandFunctionFactory",()=>{
  let mediator : DmMediatorMock;
  let dataService : DataServiceMock;
  let cmd : CommandQueueCommand;
  let sut : ExecuteCommandFunctionFactory<ViewModelImp>;
  beforeEach(()=>{
    mediator = new DmMediatorMock();
    dataService = new DataServiceMock();
    cmd = (new Mock<CommandQueueCommand>()).object();
    sut = new ExecuteCommandFunctionFactory<ViewModelImp>(
      mediator.object,
      dataService.object);
  });

  it('returns function that creates an observable that calls the dataService ' +
    'passing the command and current token from mediator',
    (done) => {
      // ********* ARRANGE ***********
      let f = sut.create(cmd);

      // ********* ACT ***************
      f().subscribe({
        complete:()=>{
          // ********* ASSERT ************

          dataService.verifyExecute(mediator.object.currentToken!,cmd);
          done();
        }
      });


    });
  it('when resolved, the observable sets the current token with the dataService response',
    (done) => {
      // ********* ARRANGE ***********
      let f = sut.create(cmd);

      // ********* ACT ***************
      f().subscribe({
        complete:()=>{
          // ********* ASSERT ************
          mediator.verifySetCurrentToken(dataService.returnsValue);
          done();
        }
      });

    });

});
