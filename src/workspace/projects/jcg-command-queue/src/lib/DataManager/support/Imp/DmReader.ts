import {IDmReader} from "../IDmReader";
import {ViewModel} from "../../../api/ViewModel";
import {Observable, Subject} from "rxjs";
import {ViewModelReader} from "../../../api/ViewModelReader";
import {IDmMediator} from "../IDmMediator";
import {Logger} from "../Logger";

export class DmReader
  implements IDmReader, IDmMediator
{
  constructor(
    private reader : ViewModelReader,
    private logger : Logger
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
            this._viewModel = v;
            this.setVersion(v.version);
          },
          error:e=>obs.error(e),
          complete:()=>{
            this.logger.addLog("DmReader","View model was read from server");
            this._onViewModelUpdated.next();
            obs.complete();
          }
        });
    });
  }

  get viewModel(): ViewModel | null {
    return this._viewModel;
  }

  private _viewModel : ViewModel | null = null;

  emitViewModelUpdated(): void {
    this._onViewModelUpdated.next();
  }

  read(): void {
    this.readViewModel().subscribe();
  }

  setVersion(value: number): void {
    this._version = value;
  }

  get version(): number {
    return this._version;
  }

  private _version = 0;

}
