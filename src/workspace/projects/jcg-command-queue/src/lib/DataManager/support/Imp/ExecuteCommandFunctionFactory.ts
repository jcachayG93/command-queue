import {IExecuteCommandFunctionFactory} from "../IExecuteCommandFunctionFactory";
import {DataManagerCommand} from "../../../api/DataManagerCommand";
import {IExecuteCommandFunction} from "../IExecuteCommandFunction";
import {IDmMediator} from "../IDmMediator";
import {ViewModel} from "../../../api/ViewModel";
import {UpdateViewModelFunctionFactory} from "../../../api/UpdateViewModelFunctionFactory";
import {DataService} from "../../../api/DataService";
import {Observable, observable} from "rxjs";

export class ExecuteCommandFunctionFactory<TViewModel extends ViewModel>
  implements IExecuteCommandFunctionFactory
{
  constructor(
    private mediator : IDmMediator,
    private updateViewModelFunctionFactory : UpdateViewModelFunctionFactory,
    private dataService : DataService
  ) {
  }
  create(cmd: DataManagerCommand): IExecuteCommandFunction {
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
