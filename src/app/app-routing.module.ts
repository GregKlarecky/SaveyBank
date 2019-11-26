import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AccountComponent } from "./components/account/account.component";
import { SignupComponent } from "./components/signup/signup.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { PaymentListComponent } from "./components/payment-list/payment-list.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/signup",
    pathMatch: "full"
  },
  { path: "login", component: LoginComponent, data: { animation: "login" } },
  {
    path: "account",
    component: AccountComponent,
    canActivate: [AuthGuard],
    data: { animation: "account" }
  },
  {
    path: "payment",
    component: PaymentComponent,
    canActivate: [AuthGuard],
    data: { animation: "payment" }
  },
  {
    path: "transactions",
    component: PaymentListComponent,
    canActivate: [AuthGuard],
    data: { animation: "transactions" }
  },
  { path: "signup", component: SignupComponent, data: { animation: "signup" } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
