import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { ToastController } from "@ionic/angular";
import { ChartDataSets } from "chart.js";
import { Label, Color } from "ng2-charts";
declare var Chart: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  latest: any;
  loading: boolean = true;
  locations = [];
  location: any;
  searchLocation: string = "";

  deathsChartData: ChartDataSets[] = [{ data: [], label: "Timeline" }];
  deathsChartLabels: Label[];

  confirmedChartData: ChartDataSets[] = [{ data: [], label: "Timeline" }];
  confirmedChartLabels: Label[];

  recoveredChartData: ChartDataSets[] = [{ data: [], label: "Timeline" }];
  recoveredChartLabels: Label[];

  // Options
  deathsChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: "Timeline"
    },
    pan: {
      enabled: true,
      mode: "xy"
    },
    zoom: {
      enabled: false,
      mode: "xy"
    }
  };
  deathChartColors: Color[] = [
    {
      borderColor: "#000000",
      backgroundColor: "#ff0000"
    }
  ];
  confirmedChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: "Timeline"
    },
    pan: {
      enabled: true,
      mode: "xy"
    },
    zoom: {
      enabled: false,
      mode: "xy"
    }
  };
  confirmedChartColors: Color[] = [
    {
      borderColor: "#000000",
      backgroundColor: "#ffff00"
    }
  ];
  recoveredChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: "Timeline"
    },
    pan: {
      enabled: true,
      mode: "xy"
    },
    zoom: {
      enabled: false,
      mode: "xy"
    }
  };
  recoveredChartColors: Color[] = [
    {
      borderColor: "#000000",
      backgroundColor: "#00ff00"
    }
  ];
  chartType = "line";
  showLegend = false;

  constructor(private toast: ToastController, private api: ApiService) {}

  ngOnInit() {
    this.loadLatest();
    this.loading = true;
    this.api.getLocations().subscribe(data => {
      this.loading = false;
      this.locations = data;
    });
  }

  loadLatest() {
    this.api.getLatest().subscribe(data => {
      this.latest = data["latest"];
      this.loading = false;
    });
  }

  search() {
    if (this.searchLocation !== "") {
      this.loading = true;
      this.api.getLocation(this.searchLocation).subscribe(data => {
        this.loading = false;
        this.location = data["location"];
        this.renderCharts();
      });
    } else {
      this.location = null;
      this.loadLatest;
    }
  }

  renderCharts() {
    this.deathsChartLabels = [];
    this.deathsChartData[0].data = [];
    this.recoveredChartLabels = [];
    this.recoveredChartData[0].data = [];
    this.confirmedChartLabels = [];
    this.confirmedChartData[0].data = [];
    const rest = parseInt(
      (
        Object.keys(this.location.timelines.recovered.timeline).length / 10
      ).toString()
    );

    Object.keys(this.location.timelines.deaths.timeline).forEach((key, i) => {
      if (
        i % rest === 1 ||
        i === 0 ||
        i === Object.keys(this.location.timelines.deaths.timeline).length - 1
      ) {
        this.deathsChartLabels.push(key.substring(0, 10));
        this.deathsChartData[0].data.push(
          this.location.timelines.deaths.timeline[key]
        );
      }
    });

    Object.keys(this.location.timelines.confirmed.timeline).forEach(
      (key, i) => {
        if (
          i % rest === 1 ||
          i === 0 ||
          i ===
            Object.keys(this.location.timelines.confirmed.timeline).length - 1
        ) {
          this.confirmedChartLabels.push(key.substring(0, 10));
          this.confirmedChartData[0].data.push(
            this.location.timelines.confirmed.timeline[key]
          );
        }
      }
    );

    Object.keys(this.location.timelines.recovered.timeline).forEach(
      (key, i) => {
        if (
          i % rest === 1 ||
          i === 0 ||
          i ===
            Object.keys(this.location.timelines.recovered.timeline).length - 1
        ) {
          this.recoveredChartLabels.push(key.substring(0, 10));
          this.recoveredChartData[0].data.push(
            this.location.timelines.recovered.timeline[key]
          );
        }
      }
    );
    // this.chartLabels.push(entry.date);
    // this.chartData[0].data.push(entry["close"]);

    // var ctx = el.getContext("2d");
    // var deathsChart = new Chart(ctx, {
    //   type: "bar",
    //   data: ,
    //   options: {
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }
    //       ]
    //     }
    //   }
    // });
  }

  refresh(event) {
    this.loading = true;
    setTimeout(() => {
      this.api.getLatest().subscribe(
        data => {
          this.latest = data["latest"];
          this.loading = false;
          this.presentToast("Dados atualizados");
        },
        error => {
          this.presentToast("Ocorreu um erro ao atualizar os dados");
        }
      );
      event.target.complete();
    }, 1000);
  }

  async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
