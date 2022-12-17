import {CommandQueueDataManagerService} from "./command-queue-data-manager.service";
import {CommandQueueDataService} from "./command-queue-data.service";
import {CommandQueueUpdateViewModelFunctionFactoryService} from "./command-queue-update-view-model-function-factory.service";
import {CommandQueueViewModelReaderService} from "./command-queue-view-model-reader.service";
import {DmReader} from "../DataManager/support/Imp/DmReader";
import {ExecuteCommandFunctionFactory} from "../DataManager/support/Imp/ExecuteCommandFunctionFactory";
import {CommandQueueDataManagerImp} from "../DataManager/CommandQueueDataManagerImp";
import {DmWriter} from "../DataManager/support/Imp/DmWriter";
import {Logger} from "../DataManager/support/Logger";
import {QueueFactory} from "../QueueV2/QueueFactory";
import {WriteErrorHandler} from "../DataManager/support/Imp/WriteErrorHandler";

const commandQueueDataManagerFactory =
  (dataService : CommandQueueDataService,
   updateViewModelFunctionFactory : CommandQueueUpdateViewModelFunctionFactoryService,
   reader : CommandQueueViewModelReaderService) => {
    const logger = new Logger();
    const dmReader = new DmReader(reader, logger);

    const executeFnFactory =
      new ExecuteCommandFunctionFactory(dmReader, dataService);

    const queueFactory = new QueueFactory(logger, executeFnFactory);
    const errorHandler = new WriteErrorHandler();
    const dmWriter = new DmWriter(queueFactory, dmReader, updateViewModelFunctionFactory, errorHandler);

    const dm = new CommandQueueDataManagerImp(dmReader, dmWriter, logger);

    return dm;
  }

  export const commandQueueDataManagerProvider = {
  provide: CommandQueueDataManagerService,
    useFactory: commandQueueDataManagerFactory,
    deps:[CommandQueueDataService, CommandQueueUpdateViewModelFunctionFactoryService, CommandQueueViewModelReaderService]
  }
