import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthComponent } from "./auth/auth.component";
import { MaterialModule } from "./material-module/material-module.module";
import { FooterComponent } from "./footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./Pages/home/home.component";
import { FeedComponent } from "./Pages/feed/feed.component";
import { SkillComponent } from "./skill/skill.component";
import {
  SearchComponent,
  subscribeDialog,
} from "./Pages/search/search.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { ErrorInterceptor } from "./interceptors/error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FooterComponent,
    HomeComponent,
    FeedComponent,
    SkillComponent,
    SearchComponent,
    subscribeDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  entryComponents: [subscribeDialog],
  bootstrap: [AppComponent],
})
export class AppModule {}
