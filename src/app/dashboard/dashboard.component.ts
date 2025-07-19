import { Component, inject } from '@angular/core';
import { WeatherData, WeatherServiceService } from '../services/weather-service.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule,   MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  weatherList: WeatherData[] = [];  
  
  constructor(private weatherService: WeatherServiceService){}
  ngOnInit(): void {
    this.weatherService.getWeather().subscribe((data: WeatherData[]) => {
      this.weatherList = data;
    });
  }
    logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
     const route = inject(Router);  
    route.navigate(['/login']);
  }
}
