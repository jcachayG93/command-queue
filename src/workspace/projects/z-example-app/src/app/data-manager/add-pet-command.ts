import {CommandQueueCommand} from "../../../../jcg-command-queue/src/lib/api/command-queue-command";

export class AddPetCommand extends CommandQueueCommand {

  constructor(name: string) {
    super();
    this.name = name;
  }

  name: string;
}
