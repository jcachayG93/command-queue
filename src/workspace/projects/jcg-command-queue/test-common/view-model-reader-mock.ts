import {ViewModelImp} from "./ViewModelImp";
import {Mock, Times} from "moq.ts";
import {of} from "rxjs";
import {ViewModelReader} from "../src/lib/api/ViewModelReader";

export class ViewModelReaderMock
{
  constructor() {
    this.moq = new Mock<ViewModelReader<ViewModelImp>>();
    this.returns = new ViewModelImp();
    this.moq.setup(s=>
    s.read()).returns(of(this.returns));
  }
  private moq : Mock<ViewModelReader<ViewModelImp>>;

  get object():ViewModelReader<ViewModelImp>
  {
    return this.moq.object();
  }

  verifyRead():void
  {
    this.moq.verify(s=>
    s.read());
  }

  verifyReadTwice():void
  {
    this.moq.verify(s=>
    s.read(),Times.Exactly(2))
  }

  returns : ViewModelImp;

}
