import {ViewModelReaderMock} from "../../../test-common/ViewModelReaderMock";
import {DmReader} from "./DmReader";
import {Logger} from "../Logger";
import {ConcurrencyTokenImp} from "../../../test-common/ConcurrencyTokenImp";

describe("DmReader",()=>{
  let reader : ViewModelReaderMock;
  let sut : DmReader;
  beforeEach(()=>{
    reader = new ViewModelReaderMock();
    sut = new DmReader(reader.object, new Logger());
  });
  it('readViewModel delegates to reader, ' +
    'sets viewModel and currentToken with result, emits onViewModelUpdated',
    () => {
      // ********* ARRANGE ***********
      let emitted = false;
      sut.onViewModelChanged
        .subscribe({next:()=>emitted = true});
      // ********* ACT ***************
      sut.readViewModel().subscribe();
      // ********* ASSERT ************
      reader.verifyRead();
      expect(sut.viewModel).toBe(reader.readReturns.viewModel);
      expect(sut.currentToken).toBe(reader.readReturns.token);
      expect(emitted).toBeTrue();
    });
  it('read, readsViewModel, ' +
    'sets viewModel and currentToken with result' +
    'emits onViewModelReadFromServer and onViewModelUpdated',
    (done) => {
      // ********* ARRANGE ***********
      let onViewModelChangedEmitted = false;
      let onViewModelReadFromServerEmitted = false;
      sut.onViewModelChanged.subscribe(()=>
        onViewModelChangedEmitted = true);
      sut.onViewModelReadFromServer.subscribe(()=>
        onViewModelReadFromServerEmitted = true);
      // ********* ACT ***************
      sut.read();
      // ********* ASSERT ************
      setTimeout(()=>{
        reader.verifyRead();
        expect(sut.viewModel).toBe(reader.readReturns.viewModel);
        expect(sut.currentToken).toBe(reader.readReturns.token);
        expect(onViewModelChangedEmitted).toBeTrue();
        expect(onViewModelReadFromServerEmitted).toBeTrue();
        done();
      },10);
    });
  it('emitViewModelUpdated does that',
    () => {
      // ********* ARRANGE ***********
      let emitted = false;
      sut.onViewModelChanged.subscribe(()=>
      emitted = true);
      // ********* ACT ***************
      sut.emitViewModelUpdated();
      // ********* ASSERT ************
      expect(emitted).toBeTrue();
    });

  it('setCurrent does that',
    () => {
      // ********* ARRANGE ***********
      const token = new ConcurrencyTokenImp();
      // ********* ACT ***************
      sut.setCurrentToken(token);
      // ********* ASSERT ************
      expect(sut.currentToken).toBe(token);
    });

});
