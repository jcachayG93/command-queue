import {CommandQueueDataService} from "../../../../jcg-command-queue/src/lib/api/command-queue-data.service";
import {delay, map, Observable, of} from "rxjs";
import {AddPetCommand} from "./add-pet-command";
import {CommandQueueCommand} from "../../../../jcg-command-queue/src/lib/api/command-queue-command";
import {Injectable} from "@angular/core";
import {ServerDataService} from "../server-data.service";
import {ConcurrencyToken} from "../../../../jcg-command-queue/src/lib/api/concurrency-token";
import {ServerResponse} from "./server-response";


@Injectable({
  providedIn:'root'
})
export class PetsDataService extends CommandQueueDataService {

  constructor(private ds : ServerDataService) {
    super();
  }




  private handle_AddPet(concurrencyToken : ConcurrencyToken, cmd: AddPetCommand): Observable<ConcurrencyToken> {
    const response = concurrencyToken as ServerResponse;
    return this.ds.addPet(response.version, cmd.name)
      .pipe(map(v=>new ServerResponse(v)));
  }



  execute(token: ConcurrencyToken, cmd: CommandQueueCommand): Observable<ConcurrencyToken> {
    if (cmd instanceof AddPetCommand) {
      return this.handle_AddPet(token, cmd);
    }
    throw new Error('Unhandled command');
  }



}
