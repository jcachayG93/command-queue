
export class Logger
{

  private _logs : string[] = [];

  get logs():string[]
  {
    return this._logs;
  }

  addLog(caller:string, message:string)
  {
    let log = `${caller}: ${message}`;
    this._logs.push(log);
  }

  reset():void
  {
    this._logs = [];
  }
}
