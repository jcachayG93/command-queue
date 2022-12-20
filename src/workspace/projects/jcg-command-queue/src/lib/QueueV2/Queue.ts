import {Logger} from "../DataManager/support/Logger";
import {CommandQueueCommand} from "../api/command-queue-command";
import {IExecuteCommandFunctionFactory} from "../DataManager/support/IExecuteCommandFunctionFactory";
import {IQueue} from "./IQueue";
import {ConcurrencyVersionMismatchError} from "../api/errors/concurrency-version-mismatch-error";



export class Queue implements IQueue {
  constructor(
    private executeFunctionFactory : IExecuteCommandFunctionFactory
  ) {
  }

  /**
   * Adds a command to the queue
   */
  add(cmd: CommandQueueCommand, errorCallback: (e: Error) => void)
    : void {
    const action = this.createAction(cmd, errorCallback);

    if (this.current == null)
    {
      this.current = action().catch(()=>this.cancelAll());
    } else
    {
      this.current = this.current.then(action,action);
    }
  }

  private current : Promise<void> | null = null;

  private cancellationToken : CancellationToken = new CancellationToken();

  private createAction(
    cmd:CommandQueueCommand,
    errorCallback:(e:Error)=>void)
  :()=>Promise<void>
  {
    this._pendingCommands.push(cmd);
    return ()=>{
      if (this.cancellationToken.CancellationRequested)
      {
        this._commandsCancelled ++;
        // If cancelled, this prevents the observable from running.
        this._pendingCommands.shift();

        return new Promise<void>((resolve)=>resolve());
      }
      return new Promise<void>((resolve,reject)=>{
        this._commandsRan++;
        const f = this.executeFunctionFactory.create(cmd);
        const subscription = f().subscribe({
          complete:()=>{
            this._pendingCommands.shift();
            setTimeout(()=>{
              subscription.unsubscribe();
            },50);
            resolve()},
          error:err=>{
            this._pendingCommands.shift();
            this.cancelAll();
            errorCallback(err);
            reject(err)}
        });
      });

    }
  }



  cancelAll(): void {

    this.cancellationToken.CancellationRequested = true;
  }

  get pendingCommands(): CommandQueueCommand[] {
    return this._pendingCommands;
  }

  private _pendingCommands : CommandQueueCommand[]=[];

  get commandsRan(): number {
    return this._commandsRan;
  }

  private _commandsRan = 0;

  get commandsCancelled(): number {
    return this._commandsCancelled;
  }

  private _commandsCancelled = 0;

}

class CancellationToken
{
  CancellationRequested = false;
}
