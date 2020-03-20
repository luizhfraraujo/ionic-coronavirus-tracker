import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../../services/database.service";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage implements OnInit {
  locations = [];
  defaultLocation: string = "";

  constructor(private database: DatabaseService, private api: ApiService) {}

  ngOnInit() {
    this.database.getLocations().then(data => {
      if (data) {
        this.locations = data;
      }
    });

    this.database.getSetting("defaultLocation").then(data => {
      console.log(data);
      if (data) {
        this.defaultLocation = data;
        console.log(this.defaultLocation);
      }
    });
  }

  setDefaultLocation(event) {
    this.database.setSetting("defaultLocation", this.defaultLocation);
  }
}
