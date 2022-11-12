import {CommandQueueViewModelReader} from "../../../../jcg-command-queue/src/lib/api/CommandQueueViewModelReader";

import {Observable} from "rxjs";
import {CommandQueueViewModel} from "../../../../jcg-command-queue/src/lib/api/CommandQueueViewModel";
import {Injectable} from "@angular/core";
import {ServerDataService} from "../server-data.service";

@Injectable({
  providedIn:'root'
})
export class PetsReader
  extends CommandQueueViewModelReader
{
  constructor(private ds : ServerDataService) {
    super();
  }


  read(): Observable<CommandQueueViewModel> {
    return this.ds.getData();
  }
}
