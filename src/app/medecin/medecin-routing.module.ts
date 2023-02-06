import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { HomeComponent } from "./components/routed/home/home.component";
import { ExamenComponent } from "./components/routed/examen/examen.component";
import { AProposComponent } from "./components/routed/a-propos/a-propos.component";
import { AideComponent } from "./components/routed/aide/aide.component";
import { ParametresComponent } from "./components/routed/parametres/parametres.component";
import { StatistiquesComponent } from "./components/routed/statistiques/statistiques.component";
import { ArchivesComponent } from "./components/routed/archives/archives.component";
import { HistoriqueComponent } from "./components/routed/historique/historique.component";
import { MesSuivisComponent } from "./components/routed/mes-suivis/mes-suivis.component";
import { OrdonnanceComponent } from "./components/routed/ordonnance/ordonnance.component";
import { ProfilComponent } from "./components/routed/profil/profil.component";
import { RadiologieComponent } from "./components/routed/radiologie/radiologie.component";
import { TestLaboratoireComponent } from "./components/routed/test-laboratoire/test-laboratoire.component";


const routes : Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'examen', component: ExamenComponent },
  { path: 'ordonnance', component: OrdonnanceComponent },
  { path: 'test-laboratoire', component: TestLaboratoireComponent },
  { path: 'radiologie', component: RadiologieComponent },
  { path: 'mes-suivis', component: MesSuivisComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: 'archives', component: ArchivesComponent },
  { path: 'statistiques', component: StatistiquesComponent },
  { path: 'parametres', component: ParametresComponent },
  { path: 'aide', component: AideComponent },
  { path: 'a-propos', component: AProposComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
  RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class MedecinRoutingModule {}
