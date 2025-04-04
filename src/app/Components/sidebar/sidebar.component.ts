import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/AdminService/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = false;
  constructor(private router: Router, private auth: AuthenticationService) { }

  // Allow dynamic submenu keys
  isSubmenuOpen: { [key: string]: boolean } = {
    services: false
  };

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;

    const sidebar = document.getElementById('modern-sidebar');
    const mainContent = document.getElementById('main-content');

    if (this.isCollapsed) {
      sidebar?.classList.add('collapsed');
      mainContent?.classList.add('collapsed');
    } else {
      sidebar?.classList.remove('collapsed');
      mainContent?.classList.remove('collapsed');
    }
  }

  toggleSubmenu(menu: string) {
    this.isSubmenuOpen[menu] = !this.isSubmenuOpen[menu]; // Dynamically toggle submenu
  }

  logout() {
    this.auth.logOut();
    // window.location.reload();
    this.router.navigateByUrl("/signin")
  }

  isLogin() {
    return this.auth.isLogin()
  }

  isLoginAdmins() {
    return this.auth.isAdmin()
  }
}
