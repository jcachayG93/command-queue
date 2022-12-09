import {IDmReader} from "../IDmReader";
import {CommandQueueViewModel} from "../../../api/command-queue-view-model";
import {Observable, Subject} from "rxjs";
import {CommandQueueViewModelReaderService} from "../../../api/command-queue-view-model-reader.service";
import {IDmMediator} from "../IDmMediator";
import {Logger} from "../Logger";
import {ConcurrencyToken} from "../../../api/concurrency-token";

export class DmReader
  implements IDmReader, IDmMediator
{
  constructor(
    private reader : CommandQueueViewModelReaderService,
    private logger : Logger
  ) {
  }

  private _onViewModelUpdated = new Subject<void>();

  get onViewModelChanged(): Subject<void> {
    return this._onViewModelUpdated;
  }

  readViewModel(): Observable<void> {

    return new Observable<void>(obs=>{
      this.reader.read()
        .subscribe({
          next:r=>{
            this._viewModel = r.viewModel;
            this._currentToken = r.token;
            this._onViewModelReadFromServer.next();
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

  /**
   * TODO: Remove deprecated code
   * @deprecated The method should not be used
   */
  setVersion(value: number): void {
    throw new Error('not implemented');
  }

/**
 * TODO: Remove deprecated code
 * @deprecated The method should not be used
 */
  get version(): number {
  throw new Error('not implemented');
}



  get onViewModelReadFromServer(): Subject<void> {
    return this._onViewModelReadFromServer;
  }


  private _onViewModelReadFromServer = new Subject<void>();

  get currentToken(): ConcurrencyToken | null {
    return this._currentToken;
  }
  setCurrentToken(value:ConcurrencyToken)
  {
    this._currentToken = value;
  }
  private _currentToken : ConcurrencyToken | null = null;

}
