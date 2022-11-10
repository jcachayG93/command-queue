import {CommandQueueDataManager} from "./CommandQueueDataManager";
import {DataService} from "./DataService";
import {UpdateViewModelFunctionFactory} from "./UpdateViewModelFunctionFactory";
import {ViewModel} from "./ViewModel";
import {ViewModelReader} from "./ViewModelReader";


export class CommandQueueDataManagerFactory<TViewModel extends ViewModel>
{
  public create(
    dataService : DataService,
    updateViewModelFunctionFactory : UpdateViewModelFunctionFactory<TViewModel>,
    reader : ViewModelReader<TViewModel>
  ):CommandQueueDataManager<TViewModel>
  {
    throw new Error('Not Implemented');
  }
}
