import {IDmReader} from "../IDmReader";
import {CommandQueueViewModel} from "../../../api/CommandQueueViewModel";
import {Observable, Subject} from "rxjs";
import {CommandQueueViewModelReader} from "../../../api/CommandQueueViewModelReader";
import {IDmMediator} from "../IDmMediator";
import {Logger} from "../Logger";

export class DmReader
  implements IDmReader, IDmMediator
{
  constructor(
    private reader : CommandQueueViewModelReader,
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
            this._onViewModelUpdated.next();
            this.logger.addLog("DmReader","View model was read from server");
            obs.complete();
          },
          error:e=>obs.error(e)
        });
    });
  }

  get viewModel(): CommandQueueViewModel | null {
    return this._viewModel;
  }

  private _viewModel : CommandQueueViewModel | null = null;

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
