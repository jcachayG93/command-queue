## Developer notes

### Overview

> The client adds commands, that are executed one after the other in a queue. The response from each command can be send back with the next command, for example,
for optimistic concurrency.

- A command must extend **CommandQueueCommand** class.
- The client must provides services thru DI:
  - CommandQueueDataManagerService: knows how to call the server to execute the commands.
  - CommandQueueViewModelReaderService: knows how to get the data from the server (read)
  - CommandQueueUpdateViewModelFunctionFactoryService: Creates a function that knows how to update a local copy of the ViewModel to reflect the changes after each command.

- The client must provide a ViewModel that extends **CommandQueueViewModel**

- Add all the parts to the DI container

```angular2html
providers: [
    {provide: CommandQueueDataService, useClass: PetsDataService},
    {provide: CommandQueueUpdateViewModelFunctionFactoryService, 
    useClass: UpdateViewModelFunctionFactoryService},
    {provide: CommandQueueViewModelReaderService, useClass: ViewModelReaderService},
    {provide: CommandQueueDataService, useClass: PetsDataService},
    commandQueueDataManagerProvider,
    {provide: DeveloperNotificationsService}
  ]
```

### Basic Usage
#### Initialize

Inject the data manager:
```angular2html
 constructor(private commandQueueDataManager : CommandQueueDataManagerService) { }
```

Before anything, the command manager must:
- Read the ViewModel 
- Subscribe to notifications as in the following example

```angular2html
ngOnInit(): void {
    this.dm.readViewModel().subscribe();
    
    this.subscriptions.add(
      this.dm.onWriteErrorOccurred.subscribe(error=>{
        if (error instanceof ConcurrencyVersionMismatchError)
        {
          this.developerNotifications.notify("Concurrency version mismatch. The local model version did not " +
          "match the remote version. Data will be reloaded", true);
        }
      })
    );
  }
```

#### Add commands to the queue
```angular2html
const cmd = new AddPetCommand(uuid(), this.inputValue);
      this.dm.executeCommand(cmd);
```

The DataManager view model is updated after each command, using the UpdateViewModelFactory service. This allows the local ViewModel to reflect the server changes
without having to wait for it. If an error occurs, the remaining commands in the queue are cancelled and the  ViewModel reloaded.

### Inner workings


#### Reader
See **IDmReader** interface.
Provides mechanisms to read data, get the current version (the server response from the last command) and some notifications.

Its implementation **DmReader** (class), depends on the **ViewModelReaderService** (provided by the user via DI)

#### Writer
See **IDmWriter** interface.
Provides mechanisms to write data (execute commands).

This method adds the commands to the queue:
```angular2html
executeCommand(cmd : CommandQueueCommand):void;
```
Read the interface to understand the other members.

Its implementation **DmWriter** depends on 3 services:
- QueueFactory
- ExecuteCommandFunctionFactory
- IDmMediator

See the **DmWritter** code to understand how it delegates to these 3 services.

##### QueueFactory
> Creates a queue

The factory code is very simple:
```angular2html
create():Queue
  {
    return new Queue(this.logger);
  }
```

What matters here is the Queue implementation.

The Queue is a class that allows adding a function (IExecuteCommandFunction) with
an onErrorCallback. If the function throws an error, the callback is invoked.
Otherwise, the next function in the queue is executed.

It also provides some properties, for example, to get how many commands are in the queue.

And a cancelAll method.

To understand this class see the **Queue** class

##### ExecuteCommandFunctionFactory
> Receives a command and returns a function. When this function is invoked, the command
is executed in the server.

See **IExecuteCommandFunctionFactory** interface.

Then, see its implementation **ExecuteCommandFunctionFactory**

This have 3 dependencies: 
- IDmMediator
- CommandQueueUpdateViewModelFunctionFactoryService
- CommandQueueDataService

The **IDmMediator** is the same as the one injected to the writer, explained later.

The ...FunctionFactoryService is the service provided by the user. It knows how to
create a function that, when called, can update the ViewModel to reflect the changes
as per the command.

The CommandQueueDataService is the DataService provided by the user.

See the code in the **ExecuteCommandFunctionFactory**

##### IDmMediator
> Mediates between the Reader and the Writer

This is a very straight forward type. There are cases when the writter and the reader must communicate,
this is the class thru which they communicate. 

For example, in the **DmWriter** executeCommand method, 
```angular2html
 executeCommand(cmd: CommandQueueCommand): void {
    let fn = this.executeCommandFunctionFactory
      .create(cmd);
    this._queue?.add(fn,(e)=>{
      this._queue.cancelAll();
      this._queue = this.queueFactory.create();
      this.mediator.read();
      this._writeErrorOccurred.next(e);
    });
  }
```
When an error occurs, the writer cancels all the commands in the queue and reads the view-model again.
The read part must be delegated to the DMReader via the Mediator.



