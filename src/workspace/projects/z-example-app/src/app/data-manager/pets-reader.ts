import {CommandQueueViewModelReaderService} from "../../../../jcg-command-queue/src/lib/api/command-queue-view-model-reader.service";

import {Observable} from "rxjs";
import {CommandQueueViewModel} from "../../../../jcg-command-queue/src/lib/api/command-queue-view-model";
import {Injectable} from "@angular/core";
import {ServerDataService} from "../server-data.service";

@Injectable({
  providedIn:'root'
})
export class PetsReader
  extends CommandQueueViewModelReaderService
{
  constructor(private ds : ServerDataService) {
    super();
  }


  readOLD(): Observable<CommandQueueViewModel> {
    return this.ds.getData();
  }
}
