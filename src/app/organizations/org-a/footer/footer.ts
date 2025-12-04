import { Component } from '@angular/core';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { AppConstant } from '../../../app.contstant';

@Component({
  selector: 'app-footer',
  imports: [MaterialComponentsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
   organizationDetails = AppConstant.ORGA;

}
