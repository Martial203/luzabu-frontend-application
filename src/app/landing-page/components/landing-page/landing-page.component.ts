import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthMedecinService } from '../../services/auth-medecin.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  // loginForm!: FormGroup;
  // loading: boolean = false;

  // constructor(private medecinAuthService: AuthMedecinService, private router: Router, private formBuilder: FormBuilder) {}

  // ngOnInit(): void{
  //   this.loginForm = this.formBuilder.group({
  //     matricule: [null, [Validators.required]],
  //     password: [null, [Validators.required]]
  //   });
  // }

  // onSubmitForm(): void{
  //   console.log(this.loginForm.value)
  //   this.loading = true;
  //   if(this.loginForm.valid){
  //     this.medecinAuthService.signIn(this.loginForm.value).subscribe({
  //       next: (val) => console.log(val),
  //       error: (err) => console.log(err),
  //       complete: () => {
  //         this.loading = false;
  //         this.router.navigateByUrl('/medecin')
  //       }
  //     })
  //   }
  // }

  // getFile(event: any): void{
  //   console.log(event.target.files[0]);
  //   this.loginForm.patchValue({
  //     file: event.target.files
  //   })
  // }
}
