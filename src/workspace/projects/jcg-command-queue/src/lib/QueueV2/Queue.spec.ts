import {QueueV2} from "./QueueV2";
import {Logger} from "../DataManager/support/Logger";
import {It, Mock} from "moq.ts";
import {CommandQueueCommand} from "../api/command-queue-command";
import {Observable, delay} from "rxjs";
import {IExecuteCommandFunctionFactory} from "../DataManager/support/IExecuteCommandFunctionFactory";
import {IExecuteCommandFunction} from "../DataManager/support/IExecuteCommandFunction";


describe('Queue',()=>{
  let executeFunctionFactory : ExecuteCommandFunctionFactoryMock;
  let sut : QueueV2;

  beforeEach(()=>{
    executeFunctionFactory = new ExecuteCommandFunctionFactoryMock();
    const logger = new Mock<Logger>();
    logger.setup(s=>s.addLog(It.IsAny(),It.IsAny())).returns();
    sut = new QueueV2(logger.object(),
      executeFunctionFactory.object);
  });
  it('when the command executes, creates an ' +
    'execute function and invokes it',
    (done) => {
      // ********* ARRANGE ***********
      const cmds = executeFunctionFactory
        .setupWithRandomDelay(0,10);
      // ********* ACT ***************
      cmds.forEach(cmd=>
      sut.add(cmd,e=>{}));
      // ********* ASSERT ************
      setTimeout(()=>{
        cmds.forEach(cmd=>
        executeFunctionFactory.verifyCreate(cmd));
        done();
      },10);
    });
  it('executes commands in a queue',
    (done) => {
      // ********* ARRANGE ***********
      const cmds = executeFunctionFactory.setupWithRandomDelay(5,20);
      // max possible delay is 300 ms.

      // ********* ACT ***************
      cmds.forEach(cmd=>
        sut.add(cmd,()=>{}));

      // ********* ASSERT ************

      setTimeout(()=>{
        for (let i=0;i<20;i++)
        {
          expect(executeFunctionFactory.ids[i])
            .toBe(i.toString());
        }
        done();
      },400);
    });
  it('cancel all, cancels those commands not running',
    (done) => {
      // ********* ARRANGE ***********
      const cmd1 = executeFunctionFactory.setupWithDelay(30,1);
      const cancellingCommand = executeFunctionFactory.setupWithCallback(()=>{sut.cancelAll();});
      const cmd3 = executeFunctionFactory.setupWithDelay(0,2);


      // ********* ACT ***************
      sut.add(cmd1,(e)=>{});
      // This command invokes sut.cancelAll, see the callback above
      sut.add(cancellingCommand,(e)=>{});
      sut.add(cmd3,(e)=>{});

      // ********* ASSERT ************

      setTimeout(()=>{
        expect(executeFunctionFactory.ids.length).toBe(1); // command 3 never ran
        done();
      },50);

    });
  it('pendingCommands returns non processed commands',
    (done) => {
      // ********* ARRANGE ***********
      const cmd1 = executeFunctionFactory.setupWithDelay(30,1);

      const cmd3 = executeFunctionFactory.setupWithDelay(0,2);
      const commandThatVerifies = executeFunctionFactory.setupWithCallback(()=>{
        const pendingCommands = sut.pendingCommands;
        expect(pendingCommands.length).toBe(2);
        expect(pendingCommands.find(c=>c == cmd3)).toBeTruthy();

        done();
      })

      // ********* ACT ***************
      sut.add(cmd1,(e)=>{});
      // This command does the verification, see callback above
      sut.add(commandThatVerifies,(e)=>{});
      sut.add(cmd3,(e)=>{});

      // ********* ASSERT ************



    });

  it('any function observable throws error, cancells all remaining commands and invokes ' +
    'error callback',
    (done) => {
      // ********* ARRANGE ***********

      let errorCallbackWasInvoked = false;
      const cmd1 = executeFunctionFactory.setupWithDelay(30,1);
      const cmd2 = executeFunctionFactory.addCommandThatThrowsError();
      const cmd3 = executeFunctionFactory.setupWithDelay(0,3);

      // ********* ACT ***************

      sut.add(cmd1,e=>{});
      sut.add(cmd2,e=>{errorCallbackWasInvoked = true});
      sut.add(cmd3,()=>{});
      // ********* ASSERT ************
      setTimeout((done)=>{
        expect(sut.pendingCommands.length).toBe(0);
        done();
      },50);
    });
  it('commandsRan returns number of commands that has been ran',
    (done) => {
      // ********* ARRANGE ***********
      const cmd1 = executeFunctionFactory.setupWithDelay(10,1);
      const cmd2 = executeFunctionFactory.setupWithDelay(10,2);
      const cmd3 = executeFunctionFactory.setupWithCallback(()=>{
        expect(sut.commandsRan).toBe(3);
        done();
      });
      sut.add(cmd1,e=>{});
      sut.add(cmd2,e=>{});
      sut.add(cmd3,e=>{});
      // ********* ASSERT ************

    });
  it('commandsCancelled returns number of commands that were cancelled',
    (done) => {
      // ********* ARRANGE ***********
      const cmd1 = executeFunctionFactory.setupWithDelay(10,1);
      const cancellingCommand = executeFunctionFactory.setupWithCallback(()=>sut.cancelAll());
      const cancelledCommand = executeFunctionFactory.setupWithDelay(10,1);
      // ********* ACT ***************
      sut.add(cmd1,e=>{});
      sut.add(cancellingCommand,e=>{});
      sut.add(cancelledCommand,e=>{});
      // ********* ASSERT ************
      setTimeout(()=>{
        expect(sut.commandsCancelled).toBe(1);
        done();
      },30);
    });
});

export class ExecuteCommandFunctionFactoryMock
{
  constructor() {
    this.moq = new Mock<IExecuteCommandFunctionFactory>();
  }
  private moq : Mock<IExecuteCommandFunctionFactory>;

  get object():IExecuteCommandFunctionFactory
  {
    return this.moq.object();
  }

  verifyCreate(cmd:CommandQueueCommand)
  {
    this.moq.verify(s=>s.create(cmd));
  }

  /**
   * This mocks setup methods create returning execute functions, when called, this functions
   * create observables. For verification, those observables are setup so they add the command
   * id value to this array.
   */
  ids:string[]=[];


  private setup(forCommand:CommandQueueCommand, returns : IExecuteCommandFunction)
  {
    this.moq.setup(s=>s.create(forCommand))
      .returns(returns);
  }

  /**
   * setups for the commands with sequential ids starting at zero. So, if the commands are
   * used to create the execute functions in the same order, the ids array should be like
   * [0,1,2,3...]
   */
  setupWithRandomDelay(maxDelay:number, count:number):CommandQueueCommand[]
  {
    const result : CommandQueueCommand[]=[];
    this.intArray(count).forEach(i=>{
      const cmd = this.setupWithDelay(this.randomDelay(maxDelay),i);
      result.push(cmd);
    })
    return result;
  }

  /**
   * Setups the factory to create a function for the returned command, that when executed will add the
   * id number to the array. This will happen with the specified delay.
   */
  setupWithDelay(delayValue:number, id:number):CommandQueueCommand
  {
    const cmd = this.randomCommand();
    this.setup(cmd,()=>
      new Observable<void>(obs=>{
        this.ids.push(id.toString());
        obs.next();
        obs.complete();
      }).pipe(delay(delayValue))
    );
    return cmd;

  }

  setupWithCallback(callback:()=>void):CommandQueueCommand
  {
    const cmd = this.randomCommand();
    this.setup(cmd,()=>
      new Observable<void>(obs=>{
        callback();
        obs.next();
        obs.complete();
      })
    );
    return cmd;
  }

  /**
   * Setups the factory to create a fucntion for the returned command. When that function is used to
   * create an observable and that observable is subscribed, an error will be thrown.
   */
  addCommandThatThrowsError():CommandQueueCommand
  {
    const cmd = this.randomCommand();
    this.setup(cmd,()=>
    new Observable(obs=>
    {
      obs.error('');
      obs.complete();
    }));
    return cmd;
  }

  private randomDelay(maxDelay:number):number
  {
    return Math.floor(Math.random()*maxDelay);
  }
  private randomCommand():CommandQueueCommand
  {
    return new TestCommand();
  }

  /**
   * An array of ints like [0,1,2...]
   */
  private intArray(count:number):number[]
  {
    const result : number[]=[];
    for (let i=0;i<count;i++)
    {
      result.push(i);
    }
    return result;
  }

}

class TestCommand
  extends CommandQueueCommand
{

}
