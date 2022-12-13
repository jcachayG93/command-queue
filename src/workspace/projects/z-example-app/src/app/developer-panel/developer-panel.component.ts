import { Component } from '@angular/core';
import {CommandQueueDataManagerService} from "../../../../jcg-command-queue/src/lib/api/command-queue-data-manager.service";
import {PetsDataService} from "../data-manager/pets-data.service";
import {CommandQueueDataService} from "../../../../jcg-command-queue/src/lib/api/command-queue-data.service";
import {ServerDataService} from "../server-data.service";
import {ServerResponse} from "../data-manager/server-response";

@Component({
  selector: 'app-developer-panel',
  templateUrl: './developer-panel.component.html',
  styleUrls: ['./developer-panel.component.scss']
})
export class DeveloperPanelComponent {

  constructor(
    private commandQueueDataManager : CommandQueueDataManagerService,
    private dataService : CommandQueueDataService,
    private serverDataService : ServerDataService) { }

  private get petsDataService():PetsDataService
  {
    return this.dataService as PetsDataService;
  }
  get commandsInQueue():number {
    return this.commandQueueDataManager.pendingCommands.length;
  }

  get localVersion():number {
    if (this.commandQueueDataManager.currentToken)
    {
      const token = this.commandQueueDataManager.currentToken as ServerResponse;
      return token.version;
    }
    return -1;
  }
  get remoteServerVersion():number {

    return this.serverDataService.modelVersion;
  }
  incrementServerModelVersion():void
  {
    this.serverDataService.incrementModelVersion();
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
