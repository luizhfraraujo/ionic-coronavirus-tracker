import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Map, tileLayer, circle, marker } from "leaflet";

@Component({
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"]
})
export class MapPage {
  locations: [];
  map: Map;

  constructor(private api: ApiService) {}
  ionViewDidEnter() {
    this.loadMap();

    this.api.getLocations().subscribe(data => {
      this.locations = data;
      this.locations.forEach((location: any) => {
        //   marker([location.coordinates.latitude, location.coordinates.longitude])
        //     .addTo(this.map)
        //     .bindPopup(
        //       `<b>País</b>: ${location.country} <br/>
        //       ${
        //         location.province
        //           ? "<b>Província</b>: " + location.province + "<br/>"
        //           : ""
        //       }
        //       <b>Últimos dados:</b> <br/>
        //       - Confirmados: ${location.latest.confirmed}<br/>
        //       - Curados: ${location.latest.recovered}<br/>
        //       - Mortes: ${location.latest.deaths}<br/>
        //     `
        //     );
        // });
        circle(
          [location.coordinates.latitude, location.coordinates.longitude],
          {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: 10 * location.latest.confirmed
          }
        )
          .addTo(this.map)
          .bindPopup(
            `<b>Country</b>: ${location.country} <br/>
            ${
              location.province
                ? "<b>Province</b>: " + location.province + "<br/>"
                : ""
            }
            <b>Latest data:</b> <br/>
            - Confirmed: ${location.latest.confirmed}<br/>
            - Recovered: ${location.latest.recovered}<br/>
            - Deaths: ${location.latest.deaths}<br/>
          `
          );
      });
    });
  }
  ionViewWillLeave() {
    this.map.remove();
  }

  // ngOnInit() {
  //   this.loading = false;
  //   this.loadMap();
  //   // this.loading = true;
  //   // this.api.getLocations().subscribe(data => {
  //   //   this.locations = data;
  //   //   this.loading = false;

  //   // });
  // }

  loadMap() {
    // In setView add latLng and zoom
    this.map = new Map("mapId").setView([28.6448, 77.216721], 5);
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY- SA</a>'
    }).addTo(this.map);
  }
}
