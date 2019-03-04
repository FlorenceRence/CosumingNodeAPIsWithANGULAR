import { NgModule } from "@angular/core";
//import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdduserComponent } from "./adduser/adduser.component";
//import { AppComponent } from "./app.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "adduser", component: AdduserComponent },
  { path: "adduser/:id", component: AdduserComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
export class AppRoutingModule {}
