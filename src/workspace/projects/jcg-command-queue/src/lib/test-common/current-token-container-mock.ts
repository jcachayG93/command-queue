import {ICurrentTokenContainer} from "../DataManager/ICurrentTokenContainer";
import {Mock, Times} from "moq.ts";
import {ConcurrencyToken} from "../api/concurrency-token";
import {ConcurrencyTokenImp} from "./ConcurrencyTokenImp";

export class CurrentTokenContainerMock
{
  constructor() {
    this.moq = new Mock<ICurrentTokenContainer>();
    this.currentToken = new ConcurrencyTokenImp();
    this.moq.setup(s=>
    s.currentToken).returns(this.currentToken);
  }
  private moq : Mock<ICurrentTokenContainer>;

  get object():ICurrentTokenContainer
  {
    return this.moq.object();
  }

  verifySetCurrentToken(value : ConcurrencyToken):void
  {
    this.moq.verify(s=>
    s.currentToken = value, Times.AtLeastOnce());
  }

  currentToken : ConcurrencyToken;
}
