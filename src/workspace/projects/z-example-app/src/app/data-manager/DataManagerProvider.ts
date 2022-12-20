import {
  CommandQueueDataManagerV2,
  CommandQueueDataService,
  CommandQueueUpdateViewModelFunctionFactoryService,
  CommandQueueViewModelReaderService, QueueFactory,
} from "jcg-command-queue";
import {AppDataManagerService} from "./app-data-manager.service";



const dataManagerFactory =
  (dataService: CommandQueueDataService,
   updateViewModelFunctionFactory : CommandQueueUpdateViewModelFunctionFactoryService,
   reader : CommandQueueViewModelReaderService
   )=>{
  const queueFactory = new QueueFactory(dataService);

  return new CommandQueueDataManagerV2(reader, queueFactory, updateViewModelFunctionFactory);
  }

export const DataManagerProvider = {
  provide:AppDataManagerService,
  useFactory: dataManagerFactory,
  deps:[CommandQueueDataService, CommandQueueUpdateViewModelFunctionFactoryService,
  CommandQueueViewModelReaderService]
}
