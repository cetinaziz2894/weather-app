import { Routes } from "@angular/router";
import { CityDetailComponent } from "../components/city-detail/city-detail.component";
import { WeatherComponent } from "../components/weather/weather.component";

export const routes: Routes = [
    { path: '', redirectTo: 'weather', pathMatch: 'full'},
    { path: 'weather', component: WeatherComponent },
    { path: 'city/:id', component: CityDetailComponent }
  ];