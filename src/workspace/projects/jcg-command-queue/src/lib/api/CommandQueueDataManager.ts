import {Observable, Subject} from "rxjs";

export abstract class CommandQueueDataManager<TViewModel extends ViewModel>
{
  readViewModel():Observable<void>;

  get commandsInQueue():number;

  get onViewModelUpdated():Subject<void>;

  executeCommand(cmd : DataManagerCommand);

  cancelCommands();
}

export abstract class DataManagerCommand
{

}

export abstract class ViewModel
{

}

export abstract class UpdateViewModelFunctionFactory<TViewModel extends ViewModel>
{
  create(cmd : DataManagerCommand):(vm:TViewModel)=>void;
}

export abstract class CallServerFunctionFactory
{
  create(cmd : DataManagerCommand):(modelVersion:number)=>Observable<number>;
}



