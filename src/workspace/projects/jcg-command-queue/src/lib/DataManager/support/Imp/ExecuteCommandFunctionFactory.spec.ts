import {DmMediatorMock} from "../../../test-common/DmMediatorMock";
import {ExecuteCommandFunctionFactory} from "./ExecuteCommandFunctionFactory";
import {ViewModelImp} from "../../../test-common/ViewModelImp";
import {CommandQueueCommand} from "../../../api/command-queue-command";
import {Mock} from "moq.ts";
import {DataServiceMock} from "../../../test-common/DataServiceMock";
import {CurrentTokenContainerMock} from "../../../test-common/current-token-container-mock";

describe("ExecuteCommandFunctionFactory",()=>{
  let currentTokenContainer : CurrentTokenContainerMock;
  let dataService : DataServiceMock;
  let cmd : CommandQueueCommand;
  let sut : ExecuteCommandFunctionFactory<ViewModelImp>;
  beforeEach(()=>{
    currentTokenContainer = new CurrentTokenContainerMock();
    dataService = new DataServiceMock();
    cmd = (new Mock<CommandQueueCommand>()).object();
    sut = new ExecuteCommandFunctionFactory<ViewModelImp>(
      dataService.object);
  });

  it('returns function that creates an observable that calls the dataService ' +
    'passing the command and current token from mediator',
    (done) => {
      // ********* ARRANGE ***********
      let f = sut.create(cmd, currentTokenContainer.object);

      // ********* ACT ***************
      f().subscribe({
        complete:()=>{
          // ********* ASSERT ************

          dataService.verifyExecute(currentTokenContainer.currentToken,cmd);
          done();
        }
      });


    });
  it('when resolved, the observable sets the current token with the dataService response',
    (done) => {
      // ********* ARRANGE ***********
      let f = sut.create(cmd, currentTokenContainer.object);

      // ********* ACT ***************
      f().subscribe({
        complete:()=>{
          // ********* ASSERT ************
          currentTokenContainer.verifySetCurrentToken(dataService.returnsValue);
          done();
        }
      });

    });

});
