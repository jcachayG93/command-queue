import {ViewModelReader} from "../api/ViewModelReader";
import {ViewModelImp} from "./ViewModelImp";
import {Mock} from "moq.ts";
import {of} from "rxjs";

export class ViewModelReaderMock
{
  constructor() {
    this.moq = new Mock<ViewModelReader<ViewModelImp>>();
    this.readReturns = new ViewModelImp();
    this.moq.setup(s=>
    s.read()).returns(of(this.readReturns));
  }
  private moq : Mock<ViewModelReader<ViewModelImp>>;

  get object():ViewModelReader<ViewModelImp>
  {
    return this.moq.object();
  }

  verifyRead():void
  {
    this.moq.verify(s=>s.read());
  }

  readReturns : ViewModelImp;

}
