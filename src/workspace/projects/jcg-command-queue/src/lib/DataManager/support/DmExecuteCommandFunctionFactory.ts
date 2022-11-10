import {ViewModel} from "../../api/ViewModel";
import {UpdateViewModelFunctionFactory} from "../../api/UpdateViewModelFunctionFactory";
import {DataService} from "../../api/DataService";
import {IExecuteCommandFunction} from "./IExecuteCommandFunction";
import {DataManagerCommand} from "../../api/DataManagerCommand";

/**
 * Creates the command function that will be added to
 * the Queue by the DataManager
 */
export class DmExecuteCommandFunctionFactory
<TViewModel extends ViewModel>
{
  constructor(
    private vmUpdateFactory : UpdateViewModelFunctionFactory<TViewModel>,
    private dataService : DataService
  ) {
  }

  /**
   * Creates a command function that can be added to the Queue. When invoked, this function creates an
   * observable that calls the server to execute the command.
   * @param cmd the command to execute
   * @param viewModel the view model, so the function can update it to reflect the changes in the command
   */
  create(
        cmd : DataManagerCommand,
        viewModel : TViewModel)
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
