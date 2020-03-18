import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MapPageRoutingModule } from "./map-routing.module";

import { MapPage } from "./map.page";
import { ApiService } from "../../services/api.service";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MapPageRoutingModule],
  declarations: [MapPage],
  providers: [ApiService]
})
export class MapPageModule {}
