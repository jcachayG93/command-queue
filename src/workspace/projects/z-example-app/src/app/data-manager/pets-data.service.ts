import {CommandQueueDataService} from "../../../../jcg-command-queue/src/lib/api/command-queue-data.service";
import {delay, Observable, of} from "rxjs";
import {AddPetCommand} from "./add-pet-command";
import {CommandQueueCommand} from "../../../../jcg-command-queue/src/lib/api/command-queue-command";
import {PetsViewModel} from "./pets-view-model";
import {Injectable} from "@angular/core";
import {ServerDataService} from "../server-data.service";


@Injectable({
  providedIn:'root'
})
export class PetsDataService extends CommandQueueDataService {

  constructor(private ds : ServerDataService) {
    super();
  }




  private handle_AddPet(version: number, cmd: AddPetCommand): Observable<number> {
    return this.ds.addPet(version, cmd.name);
  }

  execute(version: number, cmd: CommandQueueCommand): Observable<number> {
    if (cmd instanceof AddPetCommand) {
      return this.handle_AddPet(version, cmd);
    }
    throw new Error('Unhandled command');
  }



}
