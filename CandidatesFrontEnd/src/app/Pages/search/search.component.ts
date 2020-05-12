import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "src/app/_services/notifications.service";
import { User } from "src/app/_models/user";
import { FormArray, FormControl } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { DataService } from "src/app/_services/data.service";
import { Stalker } from "src/app/_models/stalker";

export interface DialogData {
  email: string;
}

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  values: number[] = [1, 5];
  searchSkills: FormArray = new FormArray([
    new FormControl(""),
    new FormControl(""),
  ]);
  searchResults: User[] = undefined;
  email: string;

  constructor(
    private notif: NotificationsService,
    public dialog: MatDialog,
    private data: DataService
  ) {}

  ngOnInit(): void {}

  add() {
    if (this.values.length >= 5) {
      this.notif.showNotif("The limit is 5 Skills");
    } else {
      this.values.push(1);
      this.searchSkills.push(new FormControl());
      // console.log("add");
    }
  }

  remove() {
    this.values.pop();
    this.searchSkills.removeAt(0);
    // console.log("remove");
  }

  async search() {
    let skills = this.getMins();

    let resp = await this.data.getUsers({ skills: skills }).toPromise();

    this.notif.showNotif(`Found ${resp.length} candidate(s)!`);

    this.searchResults = resp;
  }

  async stalk(user) {
    let skills = this.getMins();

    let newStalker: Stalker = {
      email: user.email,
      skillsMinimums: skills,
    };

    let resp = await this.data.addStalker(newStalker).toPromise();

    console.log(resp);
  }

  private getMins() {
    let skillsMinimums = [];
    for (let i = 0; i < this.values.length; i++) {
      skillsMinimums.push({
        name: this.searchSkills.controls[i].value,
        experience: this.values[i],
      });
    }
    return skillsMinimums;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(subscribeDialog, {
      width: "250px",
      data: { email: this.email },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.stalk(result);
      }
    });
  }
}

/**
 * Dialog Component to set a spot for Auction
 */
@Component({
  selector: "auction-dialog",
  templateUrl: "subscribe-dialog.html",
})
export class subscribeDialog {
  today: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<subscribeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
