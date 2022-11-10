import {Observable} from "rxjs";
import {IExecuteCommandFunction} from "../DataManager/support/IExecuteCommandFunction";

/**
 * A queue of commands that run one after another, and can be cancelled.
 * To restart the queue, create a new instance.
 */
export class Queue
{
  /**
   * Adds a command to the queue
   * @param f a function that will be called to create the observable
   * @param errorCallback, will be invoked if any of the observables created with f throws an error
   * representing the action to run, the next command will run as soon as
   * this observable completes
   */
  public add(f:IExecuteCommandFunction, errorCallback : (e:Error)=>void ):void
  {
    const action = this.createAction(f, this.cancellationToken, errorCallback);

    if (this.current == null)
    {
      this.current = action();
    } else
    {
      this.current = this.current.then(action,()=>this.cancelAll());
    }
    this.commandsInQueue++;
  }

  /**
   * How many commands were ran in the lifetime of this instance
   */
  public commandsRan = 0;

  /**
   * How many commands were cancelled
   */
  public commandsCancelled = 0;

  /**
   * The number of commands in the queue
   */
  public commandsInQueue = 0;

  /**
   * Cancel those commands that were not already running.
   * If a command was running already, it will finish before the cancellation
   * is complete.
   */
  public cancelAll():void
  {
    this.cancellationToken.CancellationRequested = true;
  }

  private current : Promise<void> | null = null;

  private cancellationToken : CancellationToken = new CancellationToken();

  private createAction(
    f:()=>Observable<void>,
    ct : CancellationToken,
    errorCallback : (e:Error)=>void):()=>Promise<void>
  {

    return ()=> {
      if (ct.CancellationRequested)
      {
        this.commandsCancelled ++;
        // If cancelled, this prevents the observable from running.
        return new Promise<void>((resolve)=>resolve());
      }
      return new Promise<void>((resolve,reject)=>{
        this.commandsRan++;
        f().subscribe({
          complete:()=>{
            this.commandsInQueue--;
            resolve()},
          error:err=>{
            errorCallback(err);
            reject(err)}
        });
      });
    }
  }
}

class CancellationToken
{
  CancellationRequested = false;
}
