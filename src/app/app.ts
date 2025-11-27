import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppConstant } from './app.contstant';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('iot-ui');
  primaryColor = AppConstant.ORGA.primaryColor;
  secondaryColor = AppConstant.ORGA.secondaryColor;

  ngOnInit() {
    document.documentElement.style.setProperty('--primary-color', this.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', this.secondaryColor);
  }
}
