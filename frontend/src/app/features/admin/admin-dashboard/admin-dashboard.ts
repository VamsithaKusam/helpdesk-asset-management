import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { TicketService } from '../../tickets/services/ticket.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboard implements OnInit {
  pendingTicketsCount: number = 0;// New variable
  totalAssetsCount: number = 0;
  // ✅ Re-adding the missing options variables
  public pieChartOptions: ChartOptions<'pie'> = { 
    responsive: true,
    plugins: { legend: { display: true, position: 'bottom' } }
  };

  public barChartOptions: ChartOptions<'bar'> = { 
    responsive: true,
    scales: { y: { beginAtZero: true } }
  };

  public pieChartLabels: string[] = [];
  public pieChartDatasets: any[] = [{ data: [], backgroundColor: ['#1f3a5f', '#f26522', '#64748b'] }];
  
  public barChartLabels: string[] = [];
  public barChartDatasets: any[] = [{ data: [], label: 'Tickets', backgroundColor: '#f26522' }];

  constructor(private ticketService: TicketService, private cdr: ChangeDetectorRef) {}
// Inside AdminDashboard class
totalActiveTickets: number = 0;

ngOnInit() {
    this.ticketService.getStats().subscribe({
      next: (stats: any) => {
        // 1. Map Chart Data
        this.pieChartLabels = stats.assetStats?.map((a: any) => a.label || a.Label) || [];
        this.pieChartDatasets[0].data = stats.assetStats?.map((a: any) => a.count || a.Count) || [];

        this.barChartLabels = stats.ticketStats?.map((t: any) => t.label || t.Label) || [];
        this.barChartDatasets[0].data = stats.ticketStats?.map((t: any) => t.count || t.Count) || [];

        // 2. Calculate "Pending" (Total minus Resolved)
        const pendingData = stats.ticketStats?.filter((t: any) => 
          (t.label || t.Label).toLowerCase() !== 'resolved'
        ) || [];
        this.pendingTicketsCount = pendingData.reduce((acc: number, curr: any) => acc + (curr.count || curr.Count || 0), 0);
        
        this.totalAssetsCount = this.pieChartDatasets[0].data.reduce((a: any, b: any) => a + b, 0);

        this.cdr.detectChanges();
      }
    });
  }
}