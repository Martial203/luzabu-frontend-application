import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-my-profile',
  templateUrl: './update-my-profile.component.html',
  styleUrls: ['./update-my-profile.component.scss']
})
export class UpdateMyProfileComponent {

  updateProfileForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void{
    this.initFormControls();
  }

  initFormControls(): void{
    this.updateProfileForm = this.formBuilder.group({
      ville: [null, [Validators.required]],
      telephone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(9)]],
      avatar: [null]
    });
  }

  onSubmit(): void{

  }
}
