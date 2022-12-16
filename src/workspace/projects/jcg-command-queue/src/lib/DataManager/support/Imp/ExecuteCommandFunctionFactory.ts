import {IExecuteCommandFunctionFactory} from "../IExecuteCommandFunctionFactory";
import {CommandQueueCommand} from "../../../api/command-queue-command";
import {IExecuteCommandFunction} from "../IExecuteCommandFunction";
import {IDmMediator} from "../IDmMediator";
import {CommandQueueViewModel} from "../../../api/command-queue-view-model";
import {CommandQueueUpdateViewModelFunctionFactoryService} from "../../../api/command-queue-update-view-model-function-factory.service";
import {CommandQueueDataService} from "../../../api/command-queue-data.service";
import {Observable, observable} from "rxjs";

export class ExecuteCommandFunctionFactory<TViewModel extends CommandQueueViewModel>
  implements IExecuteCommandFunctionFactory
{
  constructor(
    private mediator : IDmMediator,

    private dataService : CommandQueueDataService
  ) {
  }
  create(cmd: CommandQueueCommand): IExecuteCommandFunction {

    return ()=> new Observable<void>(obs=>{
      this.dataService.execute(this.mediator.currentToken!, cmd)
        .subscribe({
          next:token=>{
            this.mediator.setCurrentToken(token);
            obs.complete()
            },
          error:e=>obs.error(e)
        });
    });
  }

}
