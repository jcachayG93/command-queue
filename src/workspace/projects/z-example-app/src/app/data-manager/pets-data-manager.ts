import {Injectable} from "@angular/core";
import {CommandQueueDataManagerService} from "../../../../jcg-command-queue/src/lib/api/command-queue-data-manager.service";
import {PetsViewModel} from "./pets-view-model";
import {Observable, Subject} from "rxjs";
import {DataManagerCommand} from "../../../../jcg-command-queue/src/lib/api/DataManagerCommand";
import {PetsDataService} from "./pets-data-service";

@Injectable({
  providedIn:'root'
})
export class PetsDataManager
{
  constructor(
    private dm : CommandQueueDataManagerService
  ) {
  }

  readViewModel(): Observable<void>
  {

    return this.dm.readViewModel();
  }
  get viewModel():PetsViewModel | null
  {
    return this.dm.viewModel as PetsViewModel;
  }
  get onViewModelUpdated():Subject<void>
  {
    return this.dm.onViewModelUpdated;
  }
  executeCommand(cmd:DataManagerCommand):void
  {

    this.dm.executeCommand(cmd);
  }
  cancelCommands():void
  {
    this.dm.cancelCommands();
  }
  get commandsInQueue():number
  {
    return this.dm.commandsInQueue;
  }

  get modelVersion():number
  {
    return this.dm.modelVersion;
  }

  get developerLogs():string[]
  {
    return this.dm.developerLogs;
  }

  resetLogs():void
  {
    this.dm.resetLogs();
  }

}
