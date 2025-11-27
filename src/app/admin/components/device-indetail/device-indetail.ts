import { Component } from '@angular/core';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { AdminHeader } from '../admin-header/admin-header';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-device-indetail',
  imports: [AdminHeader, MaterialComponentsModule, CommonModule, RouterLink],
  templateUrl: './device-indetail.html',
  styleUrl: './device-indetail.scss',
})
export class DeviceIndetail {

  displayedColumns: string[] = [
    'date',
    'dataUsage',
    'connectionDuration',
  ];

  cardsData = [
    {
      title: 'Total Usage',
      value: '354.56GB',
      desc: 'Average: 10.9 GB/day',
      icon: 'trending_up'
    },
    {
      title: 'Current Usage',
      value: '12GB',
      desc: "Today's consumption",
      icon: 'data_usage'
    },
    {
      title: 'Connection Time',
      value: '12 days',
      desc: 'Since first connection',
      icon: 'calendar_today'
    },
    {
      title: 'Device Type',
      value: 'Laptop',
      desc: 'Category classification',
      icon: 'desktop_windows'
    }
  ]

  dataSource = [
    { date: '2025-11-25', dataUsage: '1.5 GB', connectionDuration: '2h 30m' },
    { date: '2025-11-26', dataUsage: '850 MB', connectionDuration: '1h 10m' },
    { date: '2025-11-27', dataUsage: '2.2 GB', connectionDuration: '3h 50m' },
    { date: '2025-11-28', dataUsage: '1.0 GB', connectionDuration: '45m' },
    { date: '2025-11-29', dataUsage: '3.4 GB', connectionDuration: '5h 15m' }
  ];

}
