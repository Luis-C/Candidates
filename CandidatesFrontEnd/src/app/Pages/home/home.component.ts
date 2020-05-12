import { Component, OnInit } from "@angular/core";
import { User } from "src/app/_models/user";
import { NotificationsService } from "src/app/_services/notifications.service";
import { AuthService } from "src/app/_services/auth.service";
import { Skill } from "src/app/_models/skill";
import { FormControl } from "@angular/forms";
import { DataService } from "src/app/_services/data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  currentUser: User;
  editMode: boolean = false;
  skills: Skill[] = [];
  newSkill = new FormControl("");

  constructor(
    private auth: AuthService,
    private notif: NotificationsService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.auth.currentUser.subscribe((changes) => {
      this.currentUser = changes;

      if (changes && changes.skills == null) {
        changes.skills = [];
      }

      if (changes && changes.skills !== null) {
        this.skills = this.currentUser.skills;
      }
    });
  }

  createSkill() {
    // console.log(this.skills.find((elem) => elem === this.newSkill.value));

    if (
      this.newSkill.value !== "" &&
      this.skills.find((elem) => elem.name === this.newSkill.value) ===
        undefined
    ) {
      this.currentUser.skills.push({
        name: this.newSkill.value,
        experience: 1,
        description: "",
      });
    } else {
      this.notif.showNotif("Already exists or is blank");
    }
  }

  edit() {
    this.editMode = true;
  }

  async save() {
    this.editMode = false;

    let params = {
      username: this.currentUser.username,
      email: this.currentUser.email,
      skills: this.skills,
    };

    let resp = await this.data.updateSkills(params).toPromise();

    if (resp) {
      this.notif.showNotif("Successfully updated!");
      this.auth.updateSkills(this.skills);
    }
  }

  onDelete(e) {
    this.skills.forEach((item, index) => {
      if (item === e) this.skills.splice(index, 1);
    });
  }
}
