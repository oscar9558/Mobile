export class UserClass {
    companyName: string;
    firstName: string;
    secondName: string;
    surname: string;
    secondSurname: string;
    email: string;
    gender: string;
    documentType;
    documentNumber: string;
    phone: string;
    department;
    city;
    adress: string;
    image: any;
    role: string;
    companyAssociated: string

    constructor() { }

    public validateComplete(role) {
        if (role == "Empresa") {
            return (this.companyName && this.email && this.documentType && this.documentNumber &&
                this.phone && this.department && this.city && this.adress);
        } else if (role == 'Recolector') {
            return (this.companyAssociated && this.firstName && this.secondName && this.surname && this.secondSurname &&
                this.email && this.gender && this.documentType && this.documentNumber &&
                this.phone && this.department && this.city && this.adress);
        } else {
            return (this.firstName && this.secondName && this.surname && this.secondSurname &&
                this.email && this.gender && this.documentType && this.documentNumber &&
                this.phone && this.department && this.city && this.adress);
        }
    }
}