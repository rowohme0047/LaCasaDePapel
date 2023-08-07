import { first } from "rxjs";

export class User{
    firstName: string='';
    lastName: string='';
    gender: string='';
     dob: string='';
    email: string='';
    username: string='';
    pass: string='';
    cpass:string='';
    constructor(
                firstname:string,
                lastname:string,
                gender:string,
                dob:string,
                email:string,
                username:string, 
                pass:string, 
                cpass:string) {
                        this.firstName=firstname;
                        this.lastName=lastname;
                        this.gender=gender;
                        this.dob=dob;
                        this.email=email;
                        this.username=username;
                        this.pass=pass;
                        this.cpass=cpass;         
    }

}
