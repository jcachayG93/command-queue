import {Injectable} from "@angular/core";
import {PetsViewModel} from "./data-manager/pets-view-model";
import {delay, Observable, of} from "rxjs";
import {
  ConcurrencyVersionMismatchError
} from "../../../jcg-command-queue/src/lib/api/errors/concurrency-version-mismatch-error";

@Injectable({
  providedIn:'root'
})
export class ServerDataService
{
  private ds : DataSource = new DataSource();

   getData():Observable<PetsViewModel>
   {
     return of(this.ds.data).pipe(delay(this.delay(500, 3000)));
   }
   addPet(version:number, name:string):Observable<number>
   {
     return new Observable<number>(obs => {
       const data = this.ds.data;
       if (data.version != version) {
         obs.error(new ConcurrencyVersionMismatchError());
       }
       else {
         data.petNames.push(name);
         data.version++;
         this.ds.data = data;
         obs.next(data.version);
         obs.complete();
       }
     }).pipe(delay(this.delay(500, 3000)));
   }

  incrementModelVersion():void
  {
    const data = this.ds.data;
    data.version++;
    this.ds.data = data;
  }
  get modelVersion():number
  {
    return this.ds.data.version;
  }

  delay(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
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
