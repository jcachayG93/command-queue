import { Component, OnInit } from '@angular/core';
import {PetsDataManager} from "../data-manager/pets-data-manager";
import {PetsViewModel} from "../data-manager/pets-view-model";
import {AddPetCommand} from "../data-manager/add-pet-command";
import {CommandQueueDataManager} from "../../../../jcg-command-queue/src/lib/api/CommandQueueDataManager";
import {
  ConcurrencyVersionMismatchError
} from "../../../../jcg-command-queue/src/lib/api/errors/concurrency-version-mismatch-error";
import {ConcurrencyVersionMismatchDialogService} from "../services/concurrency-version-mismatch-dialog.service";

@Component({
  selector: 'app-pets-grid',
  templateUrl: './pets-grid.component.html',
  styleUrls: ['./pets-grid.component.scss']
})
export class PetsGridComponent implements OnInit {

  constructor(private dm : CommandQueueDataManager,
              private dialog : ConcurrencyVersionMismatchDialogService) { }

  ngOnInit(): void {
    this.dm.readViewModel().subscribe();
    this.dm.writeErrorOccurred.subscribe({
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
    return this.dm.viewModel as PetsViewModel;
  }

  inputValue = "";

  addPet():void
  {
    if (this.inputValue != "")
    {
      const cmd = new AddPetCommand(this.inputValue);
      this.dm.executeCommand(cmd);
    }
  }

  private showOptimisticConcurrencyDialog():void
  {
    this.dialog.show();
  }

}
