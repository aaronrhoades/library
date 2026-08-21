import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header implements OnInit {
  authService = inject(AuthService);
  isLoggedIn$!: Observable<boolean>;
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logout();
  } 
}
