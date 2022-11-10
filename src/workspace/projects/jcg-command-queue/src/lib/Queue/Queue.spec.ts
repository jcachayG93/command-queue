import {Queue} from "./Queue";
import {Observable, Subject} from "rxjs";
import {IExecuteCommandFunction} from "../DataManager/support/IExecuteCommandFunction";


describe("Queue",()=>{
  let sut : Queue;
  let commandHelper : CommandHelper;

  beforeEach(()=>{
    commandHelper = new CommandHelper();
    sut = new Queue();
  })

 it('Runs the commands in a queue',
    (done) => {
      // ********* ARRANGE ***********
      const result : number[]=[];
      const commands : (()=>Observable<void>)[] = [];
      const finished = new Subject<void>();
      const samples = 500;
      for (let i=0;i<samples;i++)
      {
        const delay = i%10 == 0 ? 20 : 2;
        const cmd = commandHelper.createCommand(()=>{
          //console.log(i);
          result.push(i);
          if (i==samples-1)
          {
            finished.complete();
          }
        },5);
        commands.push(cmd);
      }

      // ********* ACT ***************

      commands.forEach(c=>
      sut.add(c,e=>{}));

      // ********* ASSERT ************

      finished.subscribe({

        error:(e)=>{done()},
        complete:()=>{

          for (let i=0;i<samples;i++)
          {
            expect(result[i])
              .toBe(i);
          }
          done();
        }
      });
    });

  it('CancelAll cancels those commands not running',
    (done) => {
      // ********* ARRANGE ***********
      let commands = commandHelper.createRandomCommands(100,10);
      // ********* ACT ***************
      commands.forEach(c=>
      sut.add(c,e=>{}));
      // ********* ASSERT ************
      setTimeout(()=>{
        sut.cancelAll();
        setTimeout(()=>{
          expect(sut.commandsCancelled).toBeGreaterThan(0);
          expect(sut.commandsCancelled + sut.commandsRan)
            .toBe(100);

          console.log("Commands cancelled:" + sut.commandsCancelled +
            " Commands ran: " + sut.commandsRan);
          done();
        },100);

      },100);
    });

  it('commandsInQueue counts the number of commands in the queue',
    (done) => {
      // ********* ARRANGE ***********
      const commands = commandHelper.createRandomCommands(100,10);
      // ********* ACT ***************
      commands.forEach(c=>
        sut.add(c,e=>{}));
      // ********* ASSERT ************
      setTimeout(()=>{
        sut.cancelAll();
        setTimeout(()=>{
          expect(sut.commandsInQueue)
            .toBe(100 - sut.commandsRan);
          done();
        },100);

      },100);
    });
  it('any observable throws error, cancels all remaining commands, invokes error callback',
    (done) => {
      // ********* ARRANGE ***********
      const commands = commandHelper.createRandomCommands(100,5);
      const error = new Error("");

      const errorCommand = commandHelper.createCommandThatThrowsError(error);
      commands.splice(3,0,errorCommand);

      let callbackError : Error | null = null;
      // ********* ACT ***************

      commands.forEach(c=>
        sut.add(c,e=>{callbackError = e}));

      // ********* ASSERT ************
      setTimeout(()=>{
        setTimeout(()=>{
          expect(sut.commandsCancelled).toBe(96);
          console.log("Cancelled commands: " + sut.commandsCancelled);
          expect(callbackError).toEqual(error);
          done();
        },100)
      },40);
    });
});

class CommandHelper
{
  public createCommand(callback:()=>void,
                        maxDelay:number):IExecuteCommandFunction
  {
    const obs = new Observable<void>(obs=>{
      const delay = Math.floor(Math.random() * maxDelay);
      const timer = setTimeout(()=>{
        callback();
        obs.complete()
      },delay);
      return ()=>{clearTimeout(timer)}
    });
    return ()=>obs;
  }

  public createRandomCommands(count:number, maxDelay:number)
  : IExecuteCommandFunction[]
  {
    const result : (()=>Observable<void>)[] = [];

    for (let i=0;i<count;i++)
    {
      result.push(this.createCommand(()=>{},maxDelay));
    }
    return result;
  }


  public createCommandThatThrowsError(e:Error):IExecuteCommandFunction
  {
    return ()=>new Observable<void>(obs=>obs.error(e));
  }
}
