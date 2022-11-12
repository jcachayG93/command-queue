import { Component } from '@angular/core';
import {CommandQueueDataManagerService} from "../../../../jcg-command-queue/src/lib/api/command-queue-data-manager.service";
import {PetsDmDataService} from "../data-manager/pets-dm-data.service";
import {DataService} from "../../../../jcg-command-queue/src/lib/api/DataService";

@Component({
  selector: 'app-developer-panel',
  templateUrl: './developer-panel.component.html',
  styleUrls: ['./developer-panel.component.scss']
})
export class DeveloperPanelComponent {

  constructor(
    private commandQueueDataManager : CommandQueueDataManagerService,
    private dataService : DataService) { }

  private get petsDataService():PetsDmDataService
  {
    return this.dataService as PetsDmDataService;
  }
  get commandsInQueue():number {
    return this.commandQueueDataManager.commandsInQueue;
  }

  get localVersion():number {
    return this.commandQueueDataManager.modelVersion;
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
    return this.commandQueueDataManager.developerLogs;
  }

  resetLogs():void
  {
    this.commandQueueDataManager.resetLogs();
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
