import { Component } from '@angular/core';
import {CommandQueueDataManager} from "../../../../jcg-command-queue/src/lib/api/CommandQueueDataManager";
import {PetsDataService} from "../data-manager/pets-data-service";

@Component({
  selector: 'app-developer-panel',
  templateUrl: './developer-panel.component.html',
  styleUrls: ['./developer-panel.component.scss']
})
export class DeveloperPanelComponent {

  constructor(
    private dm : CommandQueueDataManager,
    private dataService : PetsDataService) { }

  get commandsInQueue():number {
    return this.dm.commandsInQueue;
  }

  get localVersion():number {
    return this.dm.modelVersion;
  }
  get remoteServerVersion():number {
    return this.dataService.modelVersion;
  }
  incrementServerModelVersion():void
  {
    this.dataService.incrementModelVersion();
  }




  get commandsPercentage():number
  {
    if (this.commandsInQueue > 20)
    {
      return 100;
    }
    return this.commandsInQueue/20*100;
  }

}
