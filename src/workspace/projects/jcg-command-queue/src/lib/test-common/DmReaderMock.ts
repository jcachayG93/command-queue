import {ViewModelImp} from "./ViewModelImp";
import {IDmReader} from "../DataManager/support/IDmReader";
import {Mock} from "moq.ts";
import {Observable, Subject} from "rxjs";

export class DmReaderMock
{
  constructor() {
    this.moq = new Mock<IDmReader<ViewModelImp>>();
    this.moq.setup(s=>s.readViewModel()).returns(new Observable<void>());
    this.moq.setup(s=>s.viewModel).returns(new ViewModelImp());
    this.moq.setup(s=>s.onViewModelUpdated).returns(new Subject<void>());
    this.moq.setup(s=>s.version).returns(10);
  }
  private moq : Mock<IDmReader<ViewModelImp>>;

  get object():IDmReader<ViewModelImp>
  {
    return this.moq.object();
  }

}
