import {Injectable} from "@angular/core";

import {
  CommandQueueViewModelReader
} from "../../../../jcg-command-queue/src/lib/api/command-queue-view-model-reader.service";
import {
  CommandQueueUpdateViewModelFunctionFactory
} from "../../../../jcg-command-queue/src/lib/api/command-queue-update-view-model-function-factory";
import {CommandQueueDataManager, QueueFactory} from "../../../../jcg-command-queue/src/public-api";


@Injectable({
  providedIn:'root'
})
export class AppDataManagerService
  extends CommandQueueDataManager
{
  constructor(
    reader : CommandQueueViewModelReader,
    queueFactory : QueueFactory,
    updateViewModelFunctionFactory : CommandQueueUpdateViewModelFunctionFactory
  ) {
    super(
      reader,
      queueFactory,
      updateViewModelFunctionFactory
    );
  }
}
