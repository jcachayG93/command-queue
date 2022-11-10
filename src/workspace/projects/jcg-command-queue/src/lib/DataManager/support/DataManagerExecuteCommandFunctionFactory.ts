import {ViewModel} from "../../api/ViewModel";
import {UpdateViewModelFunctionFactory} from "../../api/UpdateViewModelFunctionFactory";
import {DataService} from "../../api/DataService";
import {Observable} from "rxjs";
import {IConcurrencyVersionMismatchErrorHandler} from "../IConcurrencyVersionMismatchErrorHandler";
import {IExecuteCommandFunction} from "./IExecuteCommandFunction";

/**
 * Creates the command function that will be added to
 * the Queue by the DataManager
 */
export class DataManagerExecuteCommandFunctionFactory
<TViewModel extends ViewModel>
{
  constructor(
    private vmUpdateFactory : UpdateViewModelFunctionFactory<TViewModel>,
    private dataService : DataService
  ) {
  }

  create(viewModel : TViewModel,
         errorHandler : IConcurrencyVersionMismatchErrorHandler)
  : IExecuteCommandFunction
  {
    throw new Error('Not Implemented');

   /* const command = ()=>{
      return new Observable<void>(obs=>{
          const updateF = this.vmUpdateFactory
            .create(cmd);
          updateF(this._viewModel!);
          this.dataService.execute(
            this._viewModel!.version,
            cmd
          )
            .subscribe({
              error: e => obs.error(),
              complete: ()=> obs.complete()
            });
        }
      );

    }*/
  }
}
