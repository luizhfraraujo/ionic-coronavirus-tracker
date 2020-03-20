import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-about",
  templateUrl: "./about.page.html",
  styleUrls: ["./about.page.scss"]
})
export class AboutPage implements OnInit {
  prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  darkTheme: boolean = false;

  constructor() {}

  ngOnInit() {
    // checkToggle(prefersDark.matches);
  }
}
