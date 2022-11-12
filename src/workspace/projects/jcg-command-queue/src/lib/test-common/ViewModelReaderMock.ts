import {CommandQueueViewModelReader} from "../api/CommandQueueViewModelReader";
import {ViewModelImp} from "./ViewModelImp";
import {Mock} from "moq.ts";
import {of} from "rxjs";

export class ViewModelReaderMock
{
  constructor() {
    this.moq = new Mock<CommandQueueViewModelReader>();
    this.readReturns = new ViewModelImp();
    this.readReturns.version = 10;
    this.moq.setup(s=>
    s.read()).returns(of(this.readReturns));
  }
  private moq : Mock<CommandQueueViewModelReader>;

  get object():CommandQueueViewModelReader
  {
    return this.moq.object();
  }

  verifyRead():void
  {
    this.moq.verify(s=>s.read());
  }

  readReturns : ViewModelImp;

}
