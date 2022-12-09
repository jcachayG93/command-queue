import {
  CommandQueueReaderResponse,
  CommandQueueViewModelReaderService
} from "../../../../jcg-command-queue/src/lib/api/command-queue-view-model-reader.service";

import {map, Observable} from "rxjs";
import {CommandQueueViewModel} from "../../../../jcg-command-queue/src/lib/api/command-queue-view-model";
import {Injectable} from "@angular/core";
import {ServerDataService} from "../server-data.service";
import {ServerResponse} from "./server-response";
import {PetsViewModel} from "./pets-view-model";

@Injectable({
  providedIn:'root'
})
export class PetsReader
  extends CommandQueueViewModelReaderService
{
  constructor(private ds : ServerDataService) {
    super();
  }

  read(): Observable<CommandQueueReaderResponse> {
    return this.ds.getData()
      .pipe(map(this.map));
  }

  private map(vm:PetsViewModel):CommandQueueReaderResponse
  {
    const response : CommandQueueReaderResponse = {
      token: new ServerResponse(vm.version),
      viewModel: vm
    };
    return response;
  }


}
