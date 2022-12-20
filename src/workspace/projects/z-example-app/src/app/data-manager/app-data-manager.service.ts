import {Injectable} from "@angular/core";
import {CommandQueueDataManagerV2} from "../../../../jcg-command-queue/src/lib/DataManager/CommandQueueDataManagerV2";
import {
  CommandQueueViewModelReaderService
} from "../../../../jcg-command-queue/src/lib/api/command-queue-view-model-reader.service";
import {QueueFactory} from "../../../../jcg-command-queue/src/lib/QueueV2/QueueFactory";
import {
  CommandQueueUpdateViewModelFunctionFactoryService
} from "../../../../jcg-command-queue/src/lib/api/command-queue-update-view-model-function-factory.service";


@Injectable({
  providedIn:'root'
})
export class AppDataManagerService
  extends CommandQueueDataManagerV2
{
  constructor(
    reader : CommandQueueViewModelReaderService,
    queueFactory : QueueFactory,
    updateViewModelFunctionFactory : CommandQueueUpdateViewModelFunctionFactoryService
  ) {
    super(
      reader,
      queueFactory,
      updateViewModelFunctionFactory
    );
  }
}
