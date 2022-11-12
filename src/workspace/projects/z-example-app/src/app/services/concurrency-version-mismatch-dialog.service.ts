import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConcurrencyVersionMismatchDialogComponent} from "./concurrency-version-mismatch-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ConcurrencyVersionMismatchDialogService {

  constructor(public dialog: MatDialog) { }

  show():void
  {
    this.dialog.open(ConcurrencyVersionMismatchDialogComponent);
  }
}
