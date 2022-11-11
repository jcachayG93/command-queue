import {PetsDataService} from "./pets-data-service";
import {PetsReader} from "./pets-reader";
import {PetsUpdateViewModelFunctionFactory} from "./pets-update-view-model-function-factory";
import {CommandQueueDataManagerFactory} from "../../../../jcg-command-queue/src/lib/api/CommandQueueDataManagerFactory";
import {PetsDataManager} from "./pets-data-manager";


const petsDataManagerServiceFactory =
  (dataService : PetsDataService)=>{

  const reader = new PetsReader(dataService);
  const updateFunctionFactory = new PetsUpdateViewModelFunctionFactory();

  const commandQueueFactory = new CommandQueueDataManagerFactory();

  const dm = commandQueueFactory.create(dataService, updateFunctionFactory, reader);

  return new PetsDataManager(dm);
  }

export const petsDataManagerServiceProvider =
  {
    provide:PetsDataManager,
    useFactory:petsDataManagerServiceFactory,
    deps:[PetsDataService]
  }


