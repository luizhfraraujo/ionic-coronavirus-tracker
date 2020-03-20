import { Injectable } from "@angular/core";

import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  constructor() {}

  public async setSetting(key, value) {
    await Storage.set({ key, value });
  }

  public async getSetting(key): Promise<any> {
    return (await Storage.get({ key })).value;
  }

  public async setLocations(value) {
    await Storage.set({ key: "locations", value: JSON.stringify(value) });
  }

  public async getLocations(): Promise<any> {
    const ret = await Storage.get({ key: "locations" });
    return JSON.parse(ret.value);
  }

  // public async getSetting(name) {
  //   return await this.storage.getItem(`setting:${name}`);
  // }

  // public setLocations(value) {
  //   return this.storage.setItem(`locations`, JSON.stringify(value));
  // }

  // public async getLocations() {
  //   return await this.storage.getItem(`locations`);
  // }
}
