import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/shared/services/auth/auth.service';
import { RestService } from 'src/app/shared/shared/services/rest/rest.service';
import { SharedMethodsService } from 'src/app/shared/shared/services/shared-methods/shared-methods.service';

@Component({
  selector: 'app-employee-hero',
  templateUrl: './employee-hero.component.html',
  styleUrls: ['./employee-hero.component.scss']
})
export class EmployeeHeroComponent implements OnChanges {

  public faUserCircle = faUserCircle;
  public faTrophy = faTrophy;
  @Input() employeeHeroDetails: any;
  public displayPicture: any;
  public isNewHire = false;

  constructor(private authService: AuthService,
              private restService: RestService,
              private sharedService: SharedMethodsService) { }

  ngOnChanges() {
    this.setDisplayPicture(this.employeeHeroDetails);
    this.isNewHire = this.sharedService.isNewHire(this.employeeHeroDetails.hiredDate);
  }

  setDisplayPicture(employee: any) {
    if (employee.gender === 'Male') {
      this.displayPicture = '../../../../assets/avatars/male.png';
    } else {
      this.displayPicture = '../../../../assets/avatars/female.png';
    }
    const url = `https://graph.microsoft.com/v1.0/users/${employee.primaryEmailAddress}/photo/$value`;
    this.authService.acquireAccessToken().then(result => {
      this.restService.httpGet(url, result).subscribe(
        (data) => {
          this.createImageFromBlob(data);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
       this.displayPicture = reader.result;
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
