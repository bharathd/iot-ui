import { Component } from '@angular/core';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { AppConstant } from '../../../app.contstant';
import { OrganizationDetails } from '../models/user';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-footer',
  imports: [MaterialComponentsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  organizationDetails!: OrganizationDetails;
   
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.organizationDetails = this.userService.getOrganizationDetailsValue() || AppConstant.ORGA;
  }

}
