import {CommandQueueDataService} from "../../../../jcg-command-queue/src/lib/api/command-queue-data.service";
import {
  CommandQueueUpdateViewModelFunctionFactoryService
} from "../../../../jcg-command-queue/src/lib/api/command-queue-update-view-model-function-factory.service";
import {
  CommandQueueViewModelReaderService
} from "../../../../jcg-command-queue/src/lib/api/command-queue-view-model-reader.service";
import {QueueFactory} from "../../../../jcg-command-queue/src/lib/QueueV2/QueueFactory";
import {
  ExecuteCommandFunctionFactory
} from "../../../../jcg-command-queue/src/lib/DataManager/support/Imp/ExecuteCommandFunctionFactory";

/*
const DataManagerFactory =
  (dataService: CommandQueueDataService,
   updateViewModelFunctionFactory : CommandQueueUpdateViewModelFunctionFactoryService,
   reader : CommandQueueViewModelReaderService
   )=>{
  const queueFactory = new QueueFactory(new ExecuteCommandFunctionFactory())
  }*/
