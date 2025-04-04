import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/DashboardServices/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  newOrdersCount: number = 0;
  allOrderCount: number = 0;
  totalIncome: number = 0;
  notificationsCount: number = 0;
  
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getNewOrdersCount();
    this.countAllorders();
  }

  getNewOrdersCount(): void {
    this.dashboardService.countNeworders().subscribe(
      (count: number) => {
        this.newOrdersCount = count;
      },
      (error) => {
        console.error('Error fetching new orders count:', error);
      }
    );
  }

  countAllorders(): void {
    this.dashboardService.countAllorders().subscribe(
      (count: number) => {
        this.allOrderCount = count;
      },
      (error) => {
        console.error('Error fetching new orders count:', error);
      }
    );
  }
}
