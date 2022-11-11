import {DataService} from "../../../../jcg-command-queue/src/lib/api/DataService";
import {delay, Observable, of} from "rxjs";
import {AddPetCommand} from "./add-pet-command";
import {
  ConcurrencyVersionMismatchError
} from "../../../../jcg-command-queue/src/lib/api/errors/concurrency-version-mismatch-error";
import {DataManagerCommand} from "../../../../jcg-command-queue/src/lib/api/DataManagerCommand";
import {PetsViewModel} from "./pets-view-model";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn:'root'
})
export class PetsDataService extends DataService {
  constructor() {
    super();
    const data = new PetsViewModel();
    this.writeToRaw(data,0);
  }
  private raw = '';
  // Overrides the raw data model version to avoid race conditions
  private version = 0;

  readRaw(): PetsViewModel {
    const result = JSON.parse(this.raw) as PetsViewModel;
    result.version = this.version;
    return result;
  }

  writeToRaw(model: PetsViewModel, version:number) {
    this.version = version;
    model.version =version;
    this.raw = JSON.stringify(model);
  }

  delay(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getPets(): Observable<PetsViewModel> {
    return of(this.readRaw()).pipe(delay(this.delay(500, 3000)));
  }

  incrementModelVersion():void
  {
    const data = this.readRaw();
    this.writeToRaw(data,this.version+1);
  }

  private handle_AddPet(version: number, cmd: AddPetCommand): Observable<number> {

    return new Observable<number>(obs => {
      const data = this.readRaw();
      if (data.version != version) {

        obs.error(new ConcurrencyVersionMismatchError());
      }
      data.petNames.push(cmd.name);
      this.writeToRaw(data, version+1);
      obs.next(data.version);
      obs.complete();
    }).pipe(delay(this.delay(500, 3000)));
  }

  execute(version: number, cmd: DataManagerCommand): Observable<number> {
    if (cmd instanceof AddPetCommand) {
      return this.handle_AddPet(version, cmd);
    }
    throw new Error('Unhandled command');
  }

  get modelVersion():number
  {
    return this.readRaw().version;
  }
}
