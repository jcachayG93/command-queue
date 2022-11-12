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

  private ds : DataSource = new DataSource();


  delay(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getPets(): Observable<PetsViewModel> {
    return of(this.ds.data).pipe(delay(this.delay(500, 3000)));
  }

  incrementModelVersion():void
  {
    const data = this.ds.data;
    data.version++;
    this.ds.data = data;
  }

  private handle_AddPet(version: number, cmd: AddPetCommand): Observable<number> {

    return new Observable<number>(obs => {
      const data = this.ds.data;
     // console.log(`command version: ${version}, server version: ${data.version}`);
      if (data.version != version) {
        obs.error(new ConcurrencyVersionMismatchError());
      }
      else {
        data.petNames.push(cmd.name);
        data.version++;
        this.ds.data = data;
        obs.next(data.version);
        obs.complete();
      }
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
    return this.ds.data.version;
  }


}

class DataSource
{
  constructor() {
    this._data = new PetsViewModel();
    this._data.version = 0;
  }
  private _data : PetsViewModel;

  get data():PetsViewModel
  {
    return this.clone(this._data);
  }

  set data(data : PetsViewModel)
  {
    this._data = this.clone(data);
  }

  private clone(data: PetsViewModel) : PetsViewModel
  {
      const result = new PetsViewModel();
      result.version = data.version;
      data.petNames.forEach(n=> result.petNames.push(n));
      return result;
  }
}
