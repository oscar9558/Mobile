import { Component, OnInit, Input,SimpleChanges, OnChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DeparmentsService } from 'src/app/services/information/departments.service';
import { CitiesService } from 'src/app/services/information/cities.service';
import { DocumentTypeService } from 'src/app/services/information/document-type.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})

export class PersonalInformationPage implements OnInit, OnChanges {
	@Input() profileInformation;
	constructor(
		private userService: UserService,
		private documentTypeService: DocumentTypeService,
		private deparmentsService: DeparmentsService,
		private citysService: CitiesService
	) {
		this.city = this.citysService.getfirstCity();
		this.department = this.deparmentsService.getfirstDepartment();
		this.documentType = this.documentTypeService.getfirstDocument();
	}

	companyAsociated:string;
	gender: string;
	documentTypeString = "Hola";
	documentType;
	documentNumber: string;
	phone: string;
	department;
	city;
	adress: string;
	documents = [];
	cities = [];
	departments = [];
	companies = [];
	genders = ["Masculino", "Femenino"]

	ngOnInit() {
		this.documents = this.documentTypeService.getDocuments();
		this.departments = this.deparmentsService.getDeparmets();
		if (this.profileInformation.role === 'Recolector')
			this.getCompanies();
	}

	getCompanies() {
		this.userService.getCompanies().subscribe(res => {
			this.companies = res;
		})
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.profileInformation && changes.profileInformation.currentValue) {
			this.gender = changes.profileInformation.currentValue.gender;
			this.documentNumber = changes.profileInformation.currentValue.documentNumber;
			this.phone = changes.profileInformation.currentValue.phone;
			if (changes.profileInformation.currentValue.department)
				this.department = changes.profileInformation.currentValue.department;
			this.cities = this.citysService.getCitys(this.department.id);
			if (changes.profileInformation.currentValue.city)
				this.city = changes.profileInformation.currentValue.city;
			if (changes.profileInformation.currentValue.documentType)
				this.documentType = changes.profileInformation.currentValue.documentType;
			this.adress = changes.profileInformation.currentValue.adress;
		}
	}

	getCitys(event) {
		this.cities = this.citysService.getCitys(event.id);
	}

	changeDocumentType(idDocument) {
		this.documentType = this.documentTypeService.getDocumentById(idDocument);
	}

	changeDeparment(idDeparment) {
		this.department = this.deparmentsService.getDeparmentById(idDeparment);
		this.getCitys({ id: idDeparment });
	}

	changeCity(idCity) {
		this.city = this.citysService.getCityById(idCity);
	}

}
