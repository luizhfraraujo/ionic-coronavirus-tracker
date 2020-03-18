import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";
import { ApiService } from "../../services/api.service";
import { ChartsModule } from "ng2-charts";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  providers: [ApiService]
})
export class HomePageModule {}
