import {Subject} from "rxjs";
import {DataManagerCommand} from "../../api/DataManagerCommand";
import {QueueFactory} from "../../Queue/QueueFactory";
import {ViewModel} from "../../api/ViewModel";
import {IDmMediator} from "./IDmMediator";
import {DmExecuteCommandFunctionFactory} from "./DmExecuteCommandFunctionFactory";
import {UpdateViewModelFunctionFactory} from "../../api/UpdateViewModelFunctionFactory";
import {Queue} from "../../Queue/Queue";

export class DmExecuteCommandRelated
<TViewModel extends ViewModel>
{
  constructor(
    private queueFactory : QueueFactory,
    private mediator : IDmMediator<TViewModel>,
    private dmExecuteCommandFunctionFactory :
      DmExecuteCommandFunctionFactory,
    private updateViewModelFunctionFactory : UpdateViewModelFunctionFactory<TViewModel>
  ) {
    this._queue = queueFactory.create();
  }

  private _queue : Queue;

  cancelCommands():void
  {
    this._queue.cancelAll();
    this.mediator.read();
    this._queue = this.queueFactory.create();
  }


  /**
   * Adds a command to the queue
   * @param cmd
   */
  executeCommand(cmd : DataManagerCommand):void
  {
    const updateFn = this.updateViewModelFunctionFactory
      .create(cmd);

    updateFn(this.mediator.getViewModel());
    this.mediator.emitViewModelUpdated();
    const executeFn = this.dmExecuteCommandFunctionFactory
      .create(cmd, this.mediator.getVersion(),(e:Error)=>{
        this.cancelCommands();
        this._writeErrorOccurred.next(e);
      });
    this._queue.add(executeFn);
  }

  /**
   * Gets the number of commands  in the queue
   */
  get commandsInQueue():number
  {
    return this._queue.commandsInQueue;
  }

  /**
   * Emits when a write error ocurred
   */
  get writeErrorOccurred():Subject<Error>
  {
    return this._writeErrorOccurred;
  }

  private _writeErrorOccurred = new Subject<Error>();

}
