import {CommandQueueCommand} from "../../../../jcg-command-queue/src/lib/api/CommandQueueCommand";

export class AddPetCommand extends CommandQueueCommand {

  constructor(name: string) {
    super();
    this.name = name;
  }

  name: string;
}
