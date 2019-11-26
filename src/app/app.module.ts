import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./components/app/app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoginComponent } from "./components/login/login.component";
import { AccountComponent } from "./components/account/account.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { SignupComponent } from "./components/signup/signup.component";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { PaymentFormComponent } from "./components/payment-form/payment-form.component";
import { PaymentListComponent } from "./components/payment-list/payment-list.component";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { AdvertismentComponent } from "./components/advertisment/advertisment.component";
import { AccountInfoComponent } from "./components/account-info/account-info.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AccountComponent,
    SignupComponent,
    UserFormComponent,
    PaymentComponent,
    PaymentFormComponent,
    PaymentListComponent,
    SideMenuComponent,
    SpinnerComponent,
    LoadingComponent,
    AdvertismentComponent,
    AccountInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoadingComponent]
})
export class AppModule {}
