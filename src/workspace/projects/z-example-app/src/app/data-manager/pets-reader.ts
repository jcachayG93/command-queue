import {ViewModelReader} from "../../../../jcg-command-queue/src/lib/api/ViewModelReader";
import {PetsViewModel} from "./pets-view-model";
import {PetsDataService} from "./pets-data-service";
import {Observable} from "rxjs";

export class PetsReader
  extends ViewModelReader<PetsViewModel>
{
  constructor(private ds : PetsDataService) {
    super();
  }

  read(): Observable<PetsViewModel> {
    return this.ds.getPets();
  }
}
