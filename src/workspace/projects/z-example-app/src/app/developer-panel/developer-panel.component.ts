import { Component } from '@angular/core';
import {CommandQueueDataManager} from "../../../../jcg-command-queue/src/lib/api/CommandQueueDataManager";
import {PetsDataService} from "../data-manager/pets-data-service";
import {DataService} from "../../../../jcg-command-queue/src/lib/api/DataService";

@Component({
  selector: 'app-developer-panel',
  templateUrl: './developer-panel.component.html',
  styleUrls: ['./developer-panel.component.scss']
})
export class DeveloperPanelComponent {

  constructor(
    private dm : CommandQueueDataManager,
    private dataService : DataService) { }

  private get petsDataService():PetsDataService
  {
    return this.dataService as PetsDataService;
  }
  get commandsInQueue():number {
    return this.dm.commandsInQueue;
  }

  get localVersion():number {
    return this.dm.modelVersion;
  }
  get remoteServerVersion():number {

    return this.petsDataService.modelVersion;
  }
  incrementServerModelVersion():void
  {
    this.petsDataService.incrementModelVersion();
  }

  get developerLogs():string[]
  {
    return this.dm.developerLogs;
  }

  resetLogs():void
  {
    this.dm.resetLogs();
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
