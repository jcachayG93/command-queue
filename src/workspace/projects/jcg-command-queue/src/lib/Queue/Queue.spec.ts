import {Queue} from "./Queue";
import {Observable, Subject} from "rxjs";


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
      sut.add(c));

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
      sut.add(c));
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
        sut.add(c));
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
  it('any observable throws error, cancels all remaining commands',
    (done) => {
      // ********* ARRANGE ***********
      const commands = commandHelper.createRandomCommands(100,5);
      const errorCommand = commandHelper.createCommandThatThrowsError();
      commands.splice(3,0,errorCommand);

      // ********* ACT ***************

      commands.forEach(c=>
        sut.add(c));

      // ********* ASSERT ************
      setTimeout(()=>{
        setTimeout(()=>{
          expect(sut.commandsCancelled).toBe(96);
          console.log("Cancelled commands: " + sut.commandsCancelled);
          done();
        },100)
      },40);
    });
});

class CommandHelper
{
  public createCommand(callback:()=>void,
                        maxDelay:number):()=>Observable<void>
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
  : (()=>Observable<void>)[]
  {
    const result : (()=>Observable<void>)[] = [];

    for (let i=0;i<count;i++)
    {
      result.push(this.createCommand(()=>{},maxDelay));
    }
    return result;
  }


  public createCommandThatThrowsError():()=>Observable<void>
  {
    return ()=>new Observable<void>(obs=>obs.error());
  }
}
