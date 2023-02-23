import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthMedecinService } from '../../services/auth-medecin.service';

@Component({
  selector: 'app-physician-login',
  templateUrl: './physician-login.component.html',
  styleUrls: ['./physician-login.component.scss']
})
export class PhysicianLoginComponent {

  loginForm!: FormGroup;
  
  constructor(private medecinAuthService: AuthMedecinService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      matricule: [null, [Validators.required]],
      password: [null, [Validators.required]],
      file: [null]
    });
  }

  onSubmitForm(): void{
    console.log(this.loginForm.value)
    if(this.loginForm.valid){
      // this.medecinAuthService.login(this.loginForm.value.matricule, this.loginForm.value.password).subscribe({
      //   next: val => {
      //     if(val==='success'){
      //       this.router.navigateByUrl('/medecin');
      //     }
      //   },
      //   error: err => console.log(err),
      //   complete: () => console.log('complete')
      // });
      // this.router.navigateByUrl('/medecin');
    }
  }

  getFile(event: any): void{
    console.log(event.target.files[0]);
    this.loginForm.patchValue({
      file: event.target.files
    })
  }

}
