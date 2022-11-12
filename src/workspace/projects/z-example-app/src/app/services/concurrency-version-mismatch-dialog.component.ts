import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-concurrency-version-mismatch-dialog',
  templateUrl: './concurrency-version-mismatch-dialog.component.html',
  styleUrls: ['./concurrency-version-mismatch-dialog.component.scss']
})
export class ConcurrencyVersionMismatchDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConcurrencyVersionMismatchDialogComponent>
  ) {}

  close():void
  {
    this.dialogRef.close();
  }

}
