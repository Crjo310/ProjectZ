import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-avatar-picker',
  templateUrl: './avatar-picker.component.html',
  styleUrls: ['./avatar-picker.component.css']
})
export class AvatarPickerComponent implements OnInit {

  public numberArray = Array.from(Array(20).keys());

  constructor(public dialogRef: MatDialogRef<AvatarPickerComponent>,) { }

  ngOnInit(): void {
  }

  clickAvatar(tile: number): void {
    this.dialogRef.close(tile);
  }

}