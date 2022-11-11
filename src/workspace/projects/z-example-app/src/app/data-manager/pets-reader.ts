import {ViewModelReader} from "../../../../jcg-command-queue/src/lib/api/ViewModelReader";

import {PetsDataService} from "./pets-data-service";
import {Observable} from "rxjs";
import {ViewModel} from "../../../../jcg-command-queue/src/lib/api/ViewModel";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class PetsReader
  extends ViewModelReader
{
  constructor(private ds : PetsDataService) {
    super();
  }

  read(): Observable<ViewModel> {
    return this.ds.getPets();
  }
}
