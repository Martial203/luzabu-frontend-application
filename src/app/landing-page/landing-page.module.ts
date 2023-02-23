import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NewPhysicianComponent } from './components/new-physician/new-physician.component';
import { PhysicianLoginComponent } from './components/physician-login/physician-login.component';
import { AsideComponent } from './components/aside/aside.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    NewPhysicianComponent,
    PhysicianLoginComponent,
    AsideComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class LandingPageModule { }
