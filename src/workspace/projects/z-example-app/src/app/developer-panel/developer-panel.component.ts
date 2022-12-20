import { Component } from '@angular/core';
import {PetsDataService} from "../data-manager/pets-data.service";
import {CommandQueueDataService} from "../../../../jcg-command-queue/src/lib/api/command-queue-data.service";
import {ServerDataService} from "../server-data.service";
import {ServerResponse} from "../data-manager/server-response";
import {AppDataManagerService} from "../data-manager/app-data-manager.service";

@Component({
  selector: 'app-developer-panel',
  templateUrl: './developer-panel.component.html',
  styleUrls: ['./developer-panel.component.scss']
})
export class DeveloperPanelComponent {

  constructor(
    private commandQueueDataManager : AppDataManagerService,
    private serverDataService : ServerDataService) { }


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



  get commandsPercentage():number
  {
    if (this.commandsInQueue > 20)
    {
      return 100;
    }
    return this.commandsInQueue/20*100;
  }

}
