import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AdminService } from "../../shared/admin.service";
import { MustMatch } from "./../user-profile/must-match";
import Swal from 'sweetalert2';
@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent {
    imageSrc: string;
    selectedFile= null;
    username;
    email;
    firstname;
    lastname;
    address;
    password;
    city;
    country;
    postalcode;
    profile_img = null;
    file;
    constructor(private fb: FormBuilder, private service: AdminService) { }
    // updateForm = new FormGroup({
            updateForm =  this.fb.group({
            userName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            postalCode: new FormControl('', [Validators.required]),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(30),


            ])),
            confirmPassword: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(30),

            ]))
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
        
        get f() { return this.updateForm.controls; }
        //   console.log(f[lastname]);
         
        get Email() {
            return this.updateForm.get('email')
        }
         
        // onFileSelected(event){
        //     this.selectedFile=event.target.files[0];
        // }

        onFileChange(event) {
            const reader = new FileReader();    
            if(event.target.files && event.target.files.length) {
              const [file] = event.target.files;
              reader.readAsDataURL(file);
               reader.onload = () => {   
                this.imageSrc = reader.result as string;     
                // this.myForm.patchValue({
                //   fileSource: reader.result
                // });   
              };
             console.log(reader);
            }
          } 
       update(){
        // if (this.updateForm.valid){
        //     alert("thank you ! your form is submitted successfully")
        //     console.log(this.updateForm.value);
        //    }else{
        //    alert("please fill all the details")
        //    }
           var formData = new FormData();
           console.log(this.username);
           console.log(this.email);
           console.log(this.firstname);
           console.log(this.lastname);
           console.log(this.address);
           console.log(this.password);
           console.log(this.city);
           console.log(this.country);
           console.log(this.postalcode);
           console.log(this.profile_img);

           formData.append('name', this.username);
           formData.append('email', this.email);
           formData.append('first_name', this.firstname);
           formData.append('last_name', this.lastname);
           formData.append('address', this.address);
           formData.append('password', this.password);
           formData.append('city', this.city);
           formData.append('country', this.country);
           formData.append('postal_code', this.postalcode);
           formData.append('profile_image', this.profile_img);

 
           this.service.saveAdminProfile(formData).subscribe(data => {
            console.log("Data Successfully Inserted!",data);
            Swal.fire('Success..!', 'Successfully Created!', 'success')
          },err => {
            if(err.status >= 400){
              console.log('Invalid Credential!!!');
            }else{
              console.log('Internet Connection Error');
            }
          })
        }
      

       }
    