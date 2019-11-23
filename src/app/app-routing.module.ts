import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AccountComponent } from "./components/account/account.component";
import { SignupComponent } from "./components/signup/signup.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { PaymentListComponent } from "./components/payment-list/payment-list.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "account", component: AccountComponent, canActivate: [AuthGuard] },
  { path: "payment", component: PaymentComponent, canActivate: [AuthGuard] },
  {
    path: "transactions",
    component: PaymentListComponent,
    canActivate: [AuthGuard]
  },
  { path: "signup", component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
