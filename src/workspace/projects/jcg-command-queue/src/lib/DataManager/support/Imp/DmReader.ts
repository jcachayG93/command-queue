import {IDmReader} from "../IDmReader";
import {ViewModel} from "../../../api/ViewModel";
import {Observable, Subject} from "rxjs";
import {ViewModelReader} from "../../../api/ViewModelReader";

export class DmReader<TViewModel extends ViewModel>
  implements IDmReader<TViewModel>
{
  constructor(
    private reader : ViewModelReader<TViewModel>
  ) {
  }

  private _onViewModelUpdated = new Subject<void>();

  get onViewModelUpdated(): Subject<void> {
    return this._onViewModelUpdated;
  }

  readViewModel(): Observable<void> {
    return new Observable<void>(obs=>{
      this.reader.read()
        .subscribe({
          next:v=>{
            this._viewModel = v
          },
          error:e=>obs.error(e),
          complete:()=>{

            this._onViewModelUpdated.next();
            obs.complete();
          }
        });
    });
  }

  get viewModel(): TViewModel | null {
    return this._viewModel;
  }

  private _viewModel : TViewModel | null = null;

}
