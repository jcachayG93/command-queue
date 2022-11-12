import {ViewModelReader} from "../../../../jcg-command-queue/src/lib/api/ViewModelReader";

import {PetsDmDataService} from "./pets-dm-data.service";
import {Observable} from "rxjs";
import {ViewModel} from "../../../../jcg-command-queue/src/lib/api/ViewModel";
import {Injectable} from "@angular/core";
import {DataService} from "../../../../jcg-command-queue/src/lib/api/DataService";

@Injectable({
  providedIn:'root'
})
export class PetsReader
  extends ViewModelReader
{
  constructor(private ds : DataService) {
    super();
  }

  private get dataService():PetsDmDataService
  {
    return this.ds as PetsDmDataService;
  }
  read(): Observable<ViewModel> {
    return this.dataService.getPets();
  }
}
