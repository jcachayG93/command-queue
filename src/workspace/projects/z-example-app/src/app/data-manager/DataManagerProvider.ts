import {
  CommandQueueDataManager,
  CommandQueueDataService,
  CommandQueueUpdateViewModelFunctionFactory,
  CommandQueueViewModelReader, QueueFactory,
} from "jcg-command-queue";
import {AppDataManagerService} from "./app-data-manager.service";
import {PetsDataService} from "./pets-data.service";
import {ServerDataService} from "../server-data.service";
import {PetsUpdateViewModelFunctionFactory} from "./pets-update-view-model-function-factory";
import {PetsReader} from "./pets-reader";



const dataManagerFactory =
  (ds:ServerDataService
   )=>{
  //dataService: CommandQueueDataService,

  const dataService = new PetsDataService(ds);
  const updateVmFunctionFactory = new PetsUpdateViewModelFunctionFactory();
  const queueFactory = new QueueFactory(dataService);
  const reader = new PetsReader(ds);
  return new CommandQueueDataManager(reader, queueFactory, updateVmFunctionFactory);
  }

export const DataManagerProvider = {
  provide:AppDataManagerService,
  useFactory: dataManagerFactory,
  deps:[ServerDataService]
}
