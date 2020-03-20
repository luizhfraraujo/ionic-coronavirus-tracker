import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "home",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../../pages/home/home.module").then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: "map",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../../pages/map/map.module").then(m => m.MapPageModule)
          }
        ]
      },
      {
        path: "about",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../../pages/about/about.module").then(
                m => m.AboutPageModule
              )
          }
        ]
      },
      {
        path: "settings",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../../pages/settings/settings.module").then(
                m => m.SettingsPageModule
              )
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/home",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
