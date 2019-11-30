import { Component, OnInit,Input, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.page.html',
  styleUrls: ['./profile-information.page.scss'],
})
export class ProfileInformationPage implements OnInit {

  @Input() profileInformation;

  firstName: string;
  companyName:string;
  secondName: string;
  surname: string;
  secondSurname: string;
  email: string;
  image: any = "../../../assets/images/picture.svg";

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.profileInformation && changes.profileInformation.currentValue) {
      this.firstName = changes.profileInformation.currentValue.firstName;
      this.companyName = changes.profileInformation.currentValue.companyName;
      this.secondName = changes.profileInformation.currentValue.secondName;
      this.surname = changes.profileInformation.currentValue.surname;
      this.secondSurname = changes.profileInformation.currentValue.secondSurname;
      this.email = changes.profileInformation.currentValue.email;
      if (changes.profileInformation.currentValue.image)
        this.image = changes.profileInformation.currentValue.image;
    }
  }

  getImage() {
    document.getElementById("upfile").click();
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      let map = new Map(JSON.parse(sessionStorage.getItem('userPermits')));
      let userName = map.keys().next().value;
      this.userService.updateImage(userName, this.image).subscribe(res=>{
        let profile=JSON.parse(sessionStorage.getItem('profileInformation'));
        profile.image=this.image;
        sessionStorage.setItem("profileInformation", JSON.stringify(profile));
      });
    }
    myReader.readAsDataURL(file);
  }

}
