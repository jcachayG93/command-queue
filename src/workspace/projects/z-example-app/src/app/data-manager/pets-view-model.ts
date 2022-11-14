import {CommandQueueViewModel} from "../../../../jcg-command-queue/src/lib/api/command-queue-view-model";

export class PetsViewModel implements CommandQueueViewModel
{
  petNames : string[] = [];
  version: number = 0;
}


