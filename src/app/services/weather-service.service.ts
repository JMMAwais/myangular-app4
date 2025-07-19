import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherData {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}



@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  private apiUrl = 'https://localhost:7011/weatherForecast'; 

  constructor(private http: HttpClient) {}

  getWeather(): Observable<WeatherData[]> {
    return this.http.get<WeatherData[]>(this.apiUrl,{ withCredentials: true });
  }
}