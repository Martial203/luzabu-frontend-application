import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RessourceNotFoundComponent } from './core/components/ressource-not-found/ressource-not-found.component';
import { AuthMedecinGuard } from './core/guards/auth-medecin.guard';
import { LandingPageComponent } from './landing-page/components/landing-page/landing-page.component';
import { NewPhysicianComponent } from './landing-page/components/new-physician/new-physician.component';
import { PhysicianLoginComponent } from './landing-page/components/physician-login/physician-login.component';
import { MedecinComponent } from './medecin/medecin.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'physician-login', component: PhysicianLoginComponent },
  { path: 'new-physician', component: NewPhysicianComponent },
  { path: 'medecin', component: MedecinComponent, loadChildren: () => import('./medecin/medecin.module').then(m => m.MedecinModule), canActivateChild: [AuthMedecinGuard] },
  { path: '**', component: RessourceNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
