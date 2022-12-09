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
    private updateViewModelFunctionFactory : CommandQueueUpdateViewModelFunctionFactoryService,
    private dataService : CommandQueueDataService
  ) {
  }
  create(cmd: CommandQueueCommand): IExecuteCommandFunction {
    let updateVmFn = this.updateViewModelFunctionFactory
      .create(cmd);
    updateVmFn(this.mediator.viewModel! as TViewModel);
    this.mediator.emitViewModelUpdated();
    return ()=> new Observable<void>(obs=>{
      this.dataService.executeOLD(this.mediator.version, cmd)
        .subscribe({
          next:v=>{
            this.mediator.setVersion(v);
            obs.complete()
            },
          error:e=>obs.error(e)
        });
    });
  }

}
