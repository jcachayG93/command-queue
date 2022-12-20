import { Component, OnInit } from '@angular/core';
import {PetsViewModel} from "../data-manager/pets-view-model";
import {AddPetCommand} from "../data-manager/add-pet-command";
import {CommandQueueDataManagerService} from "../../../../jcg-command-queue/src/lib/api/command-queue-data-manager.service";
import {
  ConcurrencyVersionMismatchError
} from "../../../../jcg-command-queue/src/lib/api/errors/concurrency-version-mismatch-error";
import {ConcurrencyVersionMismatchDialogService} from "../services/concurrency-version-mismatch-dialog.service";
import {AppDataManagerService} from "../data-manager/app-data-manager.service";

@Component({
  selector: 'app-pets-grid',
  templateUrl: './pets-grid.component.html',
  styleUrls: ['./pets-grid.component.scss']
})
export class PetsGridComponent implements OnInit {

  constructor(private commandQueueDataManager : AppDataManagerService,
              private dialog : ConcurrencyVersionMismatchDialogService) { }

  ngOnInit(): void {
    this.commandQueueDataManager.readViewModel().subscribe();
    this.commandQueueDataManager.onWriteErrorOccurred.subscribe({
      next:e=>{
        if (e instanceof ConcurrencyVersionMismatchError)
        {
          this.showOptimisticConcurrencyDialog();
        }
      }
    })
  }

  get viewModel():PetsViewModel | null
  {
    return this.commandQueueDataManager.viewModel as PetsViewModel;
  }

  inputValue = "";

  addPet():void
  {
    if (this.inputValue != "")
    {
      const cmd = new AddPetCommand(this.inputValue);
      this.commandQueueDataManager.executeCommand(cmd);
    }
  }

  private showOptimisticConcurrencyDialog():void
  {
    this.dialog.show();
  }

}
