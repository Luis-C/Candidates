import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Skill } from "../_models/skill";
import { NotificationsService } from "../_services/notifications.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-skill",
  templateUrl: "./skill.component.html",
  styleUrls: ["./skill.component.scss"],
})
export class SkillComponent implements OnInit {
  @Input() skill: Skill;
  @Input() isEditing: boolean = false;
  @Output() deleted = new EventEmitter<any>();
  experience: number = 0;
  input = new FormControl();

  constructor(private notif: NotificationsService) {}

  ngOnInit(): void {
    this.experience = this.skill.experience;
    this.input.setValue(this.skill.description);
  }

  update() {
    this.notif.notImplementedWarning("update");
  }

  edit() {
    this.notif.notImplementedWarning("edit");
    this.isEditing = true;
  }

  save() {
    this.skill.description = this.input.value;
    this.skill.experience = this.experience;
    this.isEditing = false;
  }

  delete() {
    this.deleted.emit(this.skill);
  }
}
