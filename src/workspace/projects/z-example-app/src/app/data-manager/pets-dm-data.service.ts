import {DataService} from "../../../../jcg-command-queue/src/lib/api/DataService";
import {delay, Observable, of} from "rxjs";
import {AddPetCommand} from "./add-pet-command";
import {DataManagerCommand} from "../../../../jcg-command-queue/src/lib/api/DataManagerCommand";
import {PetsViewModel} from "./pets-view-model";
import {Injectable} from "@angular/core";
import {ServerDataService} from "../server-data.service";


@Injectable({
  providedIn:'root'
})
export class PetsDmDataService extends DataService {

  constructor(private ds : ServerDataService) {
    super();
  }


  getPets(): Observable<PetsViewModel> {
    return this.ds.getData();
  }

  incrementModelVersion():void
  {
    this.ds.incrementModelVersion();
  }

  private handle_AddPet(version: number, cmd: AddPetCommand): Observable<number> {
    return this.ds.addPet(version, cmd.name);
  }

  execute(version: number, cmd: DataManagerCommand): Observable<number> {
    if (cmd instanceof AddPetCommand) {
      return this.handle_AddPet(version, cmd);
    }
    throw new Error('Unhandled command');
  }

  get modelVersion():number
  {
    return this.ds.modelVersion;
  }


}
