import {ConcurrencyToken} from "../../../../jcg-command-queue/src/lib/api/concurrency-token";

export class ServerResponse
  extends ConcurrencyToken
{

  constructor(version: number) {
    super();
    this.version = version;
  }

  version:number = 0;
}
