import {DmReadRelatedMock} from "../../../test-common/DmReadRelatedMock";
import {DmExecuteCommandRelated} from "./support/DmExecuteCommandRelated";
import {CommandQueueDataManagerImp} from "./CommandQueueDataManagerImp";
import {ViewModelImp} from "../../../test-common/ViewModelImp";
import {DmExecuteCommandRelatedMock} from "../../../test-common/DmExecuteCommandRelatedMock";
import {DataManagerCommand} from "../api/DataManagerCommand";
import {DataManagerCommandImp} from "../../../test-common/DataManagerCommandImp";
import {Mock} from "moq.ts";

describe("CommandQueueDataManagerImp",
  ()=>{
  let dmReadReladed : DmReadRelatedMock;
  let dmExecuteCommandRelated : DmExecuteCommandRelatedMock;
  let sut : CommandQueueDataManagerImp<ViewModelImp>;
  beforeEach(()=>{
    dmReadReladed = new DmReadRelatedMock();
    dmExecuteCommandRelated = new DmExecuteCommandRelatedMock();
    sut = new CommandQueueDataManagerImp<ViewModelImp>(
      dmReadReladed.object, dmExecuteCommandRelated.object
    );

  });
    function randomCommand():DataManagerCommand
    {
      return new Mock<DataManagerCommand>().object();
    }
    it('get concurrencyVersionMismatchOccurred delegates to dmExecuteCommandRelated',
      () => {
      // ******** ARRANGE ********
      // ******** ACT ********
        const result = sut.concurrencyVersionMismatchOccurred;
      // ******** ASSERT ********
        expect(result).toBe(dmExecuteCommandRelated.object.concurrencyVersionMismatchOccurred);
    });

    it('cancelCommands delegates to dmExecuteCommandRelated', () => {
      // ******** ARRANGE ********
      // ******** ACT ********
      sut.cancelCommands();
      // ******** ASSERT ********
      dmExecuteCommandRelated.verifyCancelCommands();
    });

    it('commandsInQueue delegates to dmExecuteCommandRelated', () => {
      // ******** ARRANGE ********
      // ******** ACT ********
      let result = sut.commandsInQueue;
      // ******** ASSERT ********
      expect(result).toBe(dmExecuteCommandRelated.object.commandsInQueue);
    });

    it('executeCommand delegates to dmExecuteCommandRelated', () => {
      // ******** ARRANGE ********
      const command = randomCommand();
      // ******** ACT ********
      sut.executeCommand(command);
      // ******** ASSERT ********
      dmExecuteCommandRelated.verifyExecuteCommand(command);
    });
    it('onViewModelUpdated delegates to dmReadRelated', () => {
      // ******** ARRANGE ********
      // ******** ACT ********
      const result = sut.onViewModelUpdated;
      // ******** ASSERT ********
      expect(result).toBe(dmReadReladed.object.onViewModelUpdated);
    });
    it('readViewModel delegates to dmReadRelated', () => {
      // ******** ARRANGE ********
      // ******** ACT ********
      const obs = sut.readViewModel();
      // ******** ASSERT ********
      expect(obs).toBe(dmReadReladed.object.readViewModel());
    });
    it('get viewModel delegates to dmReadRelated', () => {
      // ******** ARRANGE ********
      // ******** ACT ********
      const result = sut.viewModel;
      // ******** ASSERT ********
      expect(result).toBe(dmReadReladed.object.viewModel);
    });

  });
