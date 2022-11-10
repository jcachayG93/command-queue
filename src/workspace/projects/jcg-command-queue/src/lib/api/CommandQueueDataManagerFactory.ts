import {CommandQueueDataManager} from "./CommandQueueDataManager";
import {DataService} from "./DataService";
import {UpdateViewModelFunctionFactory} from "./UpdateViewModelFunctionFactory";
import {ViewModel} from "./ViewModel";
import {ViewModelReader} from "./ViewModelReader";
import {DmReader} from "../DataManager/support/Imp/DmReader";
import {ExecuteCommandFunctionFactory} from "../DataManager/support/Imp/ExecuteCommandFunctionFactory";
import {CommandQueueDataManagerImp} from "../DataManager/CommandQueueDataManagerImp";
import {DmWritter} from "../DataManager/support/Imp/DmWritter";
import {QueueFactory} from "../Queue/QueueFactory";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn:'root'
})
export class CommandQueueDataManagerFactory<TViewModel extends ViewModel>
{
  public create(
    dataService : DataService,
    updateViewModelFunctionFactory : UpdateViewModelFunctionFactory<TViewModel>,
    reader : ViewModelReader<TViewModel>
  ):CommandQueueDataManager<TViewModel>
  {
    const dmReader = new DmReader(reader);

    const executeFnFactory =
      new ExecuteCommandFunctionFactory(dmReader, updateViewModelFunctionFactory, dataService);

    const queueFactory = new QueueFactory();
    const dmWriter = new DmWritter(queueFactory, executeFnFactory, dmReader);

    const dm = new CommandQueueDataManagerImp(dmReader, dmWriter);

    return dm;
  }
}
