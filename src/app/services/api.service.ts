import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private url: string = "https://coronavirus-tracker-api.herokuapp.com/v2";
  constructor(private http: HttpClient) {}

  getLatest(): Observable<any> {
    return this.http.get(`${this.url}/latest`);
  }

  getLocations(): Observable<any> {
    return this.http
      .get(`${this.url}/locations`)
      .pipe(map(data => data["locations"]));
  }

  getLocation(location): Observable<any> {
    return this.http.get(`${this.url}/locations/${location}`);
  }
}
