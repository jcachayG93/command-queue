import {DataManagerCommand} from "../../../../jcg-command-queue/src/lib/api/DataManagerCommand";

export class AddPetCommand extends DataManagerCommand {

  constructor(name: string) {
    super();
    this.name = name;
  }

  name: string;
}
