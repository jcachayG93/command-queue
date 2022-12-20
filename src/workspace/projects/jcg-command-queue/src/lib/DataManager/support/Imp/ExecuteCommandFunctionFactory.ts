import {IExecuteCommandFunctionFactory} from "../IExecuteCommandFunctionFactory";
import {CommandQueueCommand} from "../../../api/command-queue-command";
import {IExecuteCommandFunction} from "../IExecuteCommandFunction";
import {IDmMediator} from "../IDmMediator";
import {CommandQueueViewModel} from "../../../api/command-queue-view-model";
import {CommandQueueUpdateViewModelFunctionFactoryService} from "../../../api/command-queue-update-view-model-function-factory.service";
import {CommandQueueDataService} from "../../../api/command-queue-data.service";
import {Observable, observable} from "rxjs";
import {ICurrentTokenContainer} from "../../ICurrentTokenContainer";

export class ExecuteCommandFunctionFactory<TViewModel extends CommandQueueViewModel>
  implements IExecuteCommandFunctionFactory
{
  constructor(
    private dataService : CommandQueueDataService
  ) {
  }
  create(cmd : CommandQueueCommand, tokenContainer : ICurrentTokenContainer): IExecuteCommandFunction {

    return ()=> new Observable<void>(obs=>{
      this.dataService.execute(tokenContainer.currentToken!, cmd)
        .subscribe({
          next:token=>{
            tokenContainer.currentToken = token;
            obs.complete()
            },
          error:e=>obs.error(e)
        });
    });
  }

}
