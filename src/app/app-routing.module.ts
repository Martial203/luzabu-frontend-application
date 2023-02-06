import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RessourceNotFoundComponent } from './core/components/ressource-not-found/ressource-not-found.component';
import { LandingPageComponent } from './landing-page/components/landing-page/landing-page.component';
import { MedecinComponent } from './medecin/medecin.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'medecin', component: MedecinComponent, loadChildren: () => import('./medecin/medecin.module').then(m => m.MedecinModule) },
  { path: '**', component: RessourceNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
