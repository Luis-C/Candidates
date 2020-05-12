import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationsService } from "../_services/notifications.service";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  hide = true;
  signup = new BehaviorSubject<boolean>(false);
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notif: NotificationsService,
    private auth: AuthService
  ) {}
  ngOnInit() {
    // Subscribe to the signup behaviourSubject and create form accordinlgy
    this.signup.subscribe((value) => {
      if (value === true) {
        this.loginForm = this.fb.group({
          username: [
            "",
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(500),
              // Validate message isn't just whitespace
              Validators.pattern(".*\\S+.*"),
            ],
          ],
          password: [
            "",
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(500),
              // Validate message isn't just whitespace
              Validators.pattern(".*\\S+.*"),
            ],
          ],
          validation: [
            "",
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(500),
              // Validate message isn't just whitespace
              Validators.pattern(".*\\S+.*"),
              // Validators.
            ],
          ],
          email: ["", [Validators.required, Validators.email]],
        });
      } else {
        this.loginForm = this.fb.group({
          username: [
            "",
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(500),
              // Validate message isn't just whitespace
              Validators.pattern(".*\\S+.*"),
            ],
          ],
          password: [
            "",
            [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(500),
              // Validate message isn't just whitespace
              Validators.pattern(".*\\S+.*"),
            ],
          ],
          // remove other fields and validators
        });
      }
    });
  }

  async authenticate() {
    if (this.signup.getValue() === true) {
      // only validate password if signing up
      if (this.loginForm.value.password === this.loginForm.value.validation) {
        let newUser = {
          username: this.loginForm.value.username,
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
          skills: [],
        };

        let resp = await this.auth.signUp(newUser).toPromise();

        // TODO: auto sign  in after succesful Sign up
        // console.log(resp);

        this.notif.showNotif("Worked! you can sign in now");
      } else {
        this.notif.showNotif("Passwords don't match", "ok");
      }
    } else {
      // Sign In
      let resp = await this.auth
        .signIn(this.loginForm.value.username, this.loginForm.value.password)
        .toPromise();

      if (resp) {
        // location.reload();
        this.notif.showNotif("Welcome");
      } else {
        this.notif.showNotif("Not Found");
      }
    }
  }
}
