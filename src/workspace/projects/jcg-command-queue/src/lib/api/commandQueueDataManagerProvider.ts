import {CommandQueueDataManagerService} from "./command-queue-data-manager.service";
import {CommandQueueDataService} from "./command-queue-data.service";
import {UpdateViewModelFunctionFactoryService} from "./update-viewModel-function-factory.service";
import {CommandQueueViewModel} from "./CommandQueueViewModel";
import {CommandQueueViewModelReader} from "./CommandQueueViewModelReader";
import {DmReader} from "../DataManager/support/Imp/DmReader";
import {ExecuteCommandFunctionFactory} from "../DataManager/support/Imp/ExecuteCommandFunctionFactory";
import {CommandQueueDataManagerImp} from "../DataManager/CommandQueueDataManagerImp";
import {DmWritter} from "../DataManager/support/Imp/DmWritter";
import {QueueFactory} from "../Queue/QueueFactory";
import {Injectable} from "@angular/core";
import {Logger} from "../DataManager/support/Logger";
import {UpdateViewModelFunctionFactoryMock} from "../test-common/UpdateViewModelFunctionFactoryMock";

const commandQueueDataManagerFactory =
  (dataService : CommandQueueDataService,
   updateViewModelFunctionFactory : UpdateViewModelFunctionFactoryService,
   reader : CommandQueueViewModelReader) => {
    const logger = new Logger();
    const dmReader = new DmReader(reader, logger);

    const executeFnFactory =
      new ExecuteCommandFunctionFactory(dmReader, updateViewModelFunctionFactory, dataService);

    const queueFactory = new QueueFactory(logger);
    const dmWriter = new DmWritter(queueFactory, executeFnFactory, dmReader);

    const dm = new CommandQueueDataManagerImp(dmReader, dmWriter, logger);

    return dm;
  }

  export const commandQueueDataManagerProvider = {
  provide: CommandQueueDataManagerService,
    useFactory: commandQueueDataManagerFactory,
    deps:[CommandQueueDataService, UpdateViewModelFunctionFactoryService, CommandQueueViewModelReader]
  }
