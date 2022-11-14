import {CommandQueueViewModelReaderService} from "../../../../jcg-command-queue/src/lib/api/CommandQueueViewModelReaderService";

import {Observable} from "rxjs";
import {CommandQueueViewModel} from "../../../../jcg-command-queue/src/lib/api/CommandQueueViewModel";
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


  read(): Observable<CommandQueueViewModel> {
    return this.ds.getData();
  }
}
