import {DmExecuteCommandFunctionFactory} from "../src/lib/DataManager/support/DmExecuteCommandFunctionFactory";
import {IExecuteCommandFunction} from "../src/lib/DataManager/support/IExecuteCommandFunction";
import {DataManagerCommand} from "../src/lib/api/DataManagerCommand";
import {DataService} from "../src/lib/api/DataService";
import {Mock} from "moq.ts";

export class DmExecuteCommandFunctionDouble
  extends DmExecuteCommandFunctionFactory
{
  constructor() {
    super(new Mock<DataService>().object());
    this.returns = new Mock<IExecuteCommandFunction>().object();
  }
  override create(cmd: DataManagerCommand, version: number,
                  onErrorCallback: (e: Error) => void): IExecuteCommandFunction {
    this.createArgs =
      new DmExecuteCommandFunctionCreateArgs(cmd, version, onErrorCallback);

    return this.returns;
  }

  createArgs : DmExecuteCommandFunctionCreateArgs | null = null;

  returns : IExecuteCommandFunction;
}

export class DmExecuteCommandFunctionCreateArgs
{

  constructor(cmd: DataManagerCommand, version: number, onErrorCallback: (e: Error) => void) {
    this.cmd = cmd;
    this.version = version;
    this.onErrorCallback = onErrorCallback;
  }

  cmd:DataManagerCommand;
  version:number;
  onErrorCallback:(e:Error) => void;
}


