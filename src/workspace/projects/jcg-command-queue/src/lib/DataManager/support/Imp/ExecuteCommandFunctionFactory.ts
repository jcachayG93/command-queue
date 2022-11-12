import {IExecuteCommandFunctionFactory} from "../IExecuteCommandFunctionFactory";
import {CommandQueueCommand} from "../../../api/CommandQueueCommand";
import {IExecuteCommandFunction} from "../IExecuteCommandFunction";
import {IDmMediator} from "../IDmMediator";
import {CommandQueueViewModel} from "../../../api/CommandQueueViewModel";
import {UpdateViewModelFunctionFactoryService} from "../../../api/update-viewModel-function-factory.service";
import {CommandQueueDataService} from "../../../api/command-queue-data.service";
import {Observable, observable} from "rxjs";

export class ExecuteCommandFunctionFactory<TViewModel extends CommandQueueViewModel>
  implements IExecuteCommandFunctionFactory
{
  constructor(
    private mediator : IDmMediator,
    private updateViewModelFunctionFactory : UpdateViewModelFunctionFactoryService,
    private dataService : CommandQueueDataService
  ) {
  }
  create(cmd: CommandQueueCommand): IExecuteCommandFunction {
    let updateVmFn = this.updateViewModelFunctionFactory
      .create(cmd);
    updateVmFn(this.mediator.viewModel! as TViewModel);
    return ()=> new Observable<void>(obs=>{
      this.dataService.execute(this.mediator.version, cmd)
        .subscribe({
          next:v=>{this.mediator.setVersion(v);},
          error:e=>obs.error(e),
          complete:()=>obs.complete()
        });
    });
  }

}
