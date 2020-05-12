import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  disabled = true;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.currentUser.subscribe((value) => {
      value ? (this.disabled = false) : (this.disabled = true);
    });
  }

  logout() {
    this.auth.logout();
  }
}
