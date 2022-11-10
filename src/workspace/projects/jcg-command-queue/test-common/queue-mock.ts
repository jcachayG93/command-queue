import {It, Mock} from "moq.ts";
import {Observable} from "rxjs";
import {Queue} from "../src/lib/Queue/Queue";

export class QueueMock
{
  constructor() {
    this.moq = new Mock<Queue>();
    this.moq.setup(s=>
    s.add(It.IsAny()))
      .returns();
    this.moq.setup(s=>
    s.commandsInQueue).returns(10);
    this.moq.setup(s=>
    s.cancelAll()).returns();
  }
  private moq : Mock<Queue>;

  get object():Queue
  {
    return this.moq.object();
  }

  verifyAdd(f:()=>Observable<void>)
  {
    this.moq.verify(s=>
    s.add(f));
  }
  verifyCancelAll()
  {
    this.moq.verify(s=>
    s.cancelAll());
  }

}
