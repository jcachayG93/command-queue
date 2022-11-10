import {ViewModelImp} from "./ViewModelImp";
import {DmReadRelated} from "../src/lib/DataManager/support/DmReadRelated";
import {It, Mock} from "moq.ts";
import {Observable, Subject} from "rxjs";
import {ViewModel} from "../src/lib/api/ViewModel";

export class DmReadRelatedMock
{
  constructor() {
    this.moq = new Mock<DmReadRelated<ViewModelImp>>();
    this.readViewModelReturns = new Observable<void>(obs=>obs.complete());
    this.moq.setup(s=>s.readViewModel()).returns(this.readViewModelReturns);
    this.moq.setup(s=>s.currentVersion).returns(10);
    this.moq.setup(s=>s.setCurrentVersion(It.IsAny()));
    this.moq.setup(s=>s.viewModel).returns(new ViewModelImp());
    this.moq.setup(s=>s.onViewModelUpdated).returns(this._onViewModelUpdated);
    this.moq.setup(s=>s.emitViewModelUpdated()).returns();
  }
  private moq : Mock<DmReadRelated<ViewModelImp>>;

  get object():DmReadRelated<ViewModelImp>
  {
    return this.moq.object();
  }

  verifyReadViewModel():void
  {
    this.moq.verify(s=>s.readViewModel());
  }

  readViewModelReturns : Observable<void>;

  verifySetCurrentModelVersion(value:number):void
  {
    this.moq.verify(s=>s.setCurrentVersion(value));
  }


  _onViewModelUpdated = new Subject<void>();

  verifyEmitViewModelUpdated():void
  {
    this.moq.verify(s=>s.emitViewModelUpdated());
  }

  /**
   * Forces the moq onViewModelUpdated property value (subject) to emit
   */
  testEmitOnViewModelUpdated():void
  {
    this._onViewModelUpdated.next();
  }

}
