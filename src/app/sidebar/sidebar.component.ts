import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
constructor(private authService:AuthService){}
  logout() {
    this.authService.logout();
  }
}
