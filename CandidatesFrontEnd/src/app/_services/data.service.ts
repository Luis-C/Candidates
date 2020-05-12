import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../_models/user";
import { Stalker } from "../_models/stalker";
import { Skill } from "../_models/skill";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private PATH = "http://localhost:3030/";

  constructor(private http: HttpClient) {}

  addStalker(stalker: Stalker) {
    return this.http.post(`${this.PATH}stalker/addstalker`, stalker);
  }

  getUsers(params) {
    return this.http.post<User[]>(`${this.PATH}user/allusers/`, params);
  }

  addSkill(skill: Skill) {
    return this.http.post(`${this.PATH}user/addskill`, skill);
  }

  updateSkills(params) {
    return this.http.post(`${this.PATH}user/updateskills`, params);
  }
}
