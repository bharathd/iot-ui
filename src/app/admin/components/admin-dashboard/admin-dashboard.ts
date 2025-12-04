import { Component } from '@angular/core';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { CommonModule } from '@angular/common';
import { AdminHeader } from "../admin-header/admin-header";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [MaterialComponentsModule, CommonModule, AdminHeader, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {

  constructor(private router: Router) {}

  displayedColumns: string[] = [
    'device',
    'deviceId',
    'type',
    'status',
    'connected',
    'usage',
    'actions'
  ];


  cardsData = [
    {
      title: 'Total Usage',
      value: '354.56GB',
      desc: '+12% from last month',
      icon: 'trending_up'
    },
    {
      title: 'Connected Users',
      value: '12',
      desc: '+3 since yesterday',
      icon: 'group'
    },
    {
      title: 'online Devices',
      value: '12',
      desc: 'All systems operational',
      icon: 'star_shine'
    },
    {
      title: 'Network Speed',
      value: '150 Mbps',
      desc: 'Optimal • 99.9% uptime',
      icon: 'wifi_on'
    }
  ]

  dataSource = [
    {
      device: "Smart Sensor A1",
      deviceId: "DEV-001245",
      type: "Temperature Sensor",
      status: "online",
      connected: "Yes",
      usage: "1.3 kWh/day",
    },
    {
      device: "Relay Controller X7",
      deviceId: "DEV-002178",
      type: "Relay Switch",
      status: "offline",
      connected: "No",
      usage: "0.4 kWh/day",
    },
    {
      device: "Water Flow Meter Z2",
      deviceId: "DEV-003526",
      type: "Flow Meter",
      status: "online",
      connected: "Yes",
      usage: "0.9 kWh/day",
    },
    {
      device: "Smart Lamp L9",
      deviceId: "DEV-004801",
      type: "Light Control",
      status: "online",
      connected: "Yes",
      usage: "2.8 kWh/day",
    },
    {
      device: "HVAC Controller H5",
      deviceId: "DEV-005663",
      type: "HVAC Module",
      status: "online",
      connected: "Yes",
      usage: "8.1 kWh/day",
    },
    {
      device: "Door Lock T1",
      deviceId: "DEV-006912",
      type: "Smart Lock",
      status: "offline",
      connected: "No",
      usage: "0.0 kWh/day",
    }
  ];

  viewDevice() {
    this.router.navigate(['/admin/device-details'])
  }
}
