import {
  CommandQueueDeveloperPanelService
} from "../../../../jcg-command-queue-components/src/public-api";
import {Injectable} from "@angular/core";
import {PetsDataManager} from "./pets-data-manager";
import {PetsDataService} from "./pets-data-service";

@Injectable({
  providedIn:'root'
})
export class PetsDataManagerPanelService
  extends CommandQueueDeveloperPanelService
{
  constructor(
    private dm : PetsDataManager,
    private dataService : PetsDataService
    ) {
    super();
  }
  get commandsInQueue(): number {
    return this.dm.commandsInQueue;
  }

  incrementModelVersion(): void {
    this.dataService.incrementModelVersion();
  }

  get modelVersion(): number {
    return this.dm.modelVersion;
  }

}
