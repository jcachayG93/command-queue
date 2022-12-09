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
