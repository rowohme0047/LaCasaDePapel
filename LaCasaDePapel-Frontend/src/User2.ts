export class User2{
    id:any;
    firstName: string='';
    lastName: string='';
    gender: string='';
     dob: string='';
    email: string='';
    username: string='';
    pass: string='';
    cpass:string='';
    constructor(
                id:any,
                firstname:string,
                lastname:string,
                gender:string,
                dob:string,
                email:string,
                username:string, 
                pass:string, 
                cpass:string) {
                        this.id=id;
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