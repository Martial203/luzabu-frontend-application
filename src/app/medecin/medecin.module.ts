import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/routed/home/home.component';
import { ConsultationComponent } from './components/routed/consultation/consultation.component';
import { ExamenComponent } from './components/routed/examen/examen.component';
import { OrdonnanceComponent } from './components/routed/ordonnance/ordonnance.component';
import { TestLaboratoireComponent } from './components/routed/test-laboratoire/test-laboratoire.component';
import { RadiologieComponent } from './components/routed/radiologie/radiologie.component';
import { MesSuivisComponent } from './components/routed/mes-suivis/mes-suivis.component';
import { ProfilComponent } from './components/routed/profil/profil.component';
import { HistoriqueComponent } from './components/routed/historique/historique.component';
import { ArchivesComponent } from './components/routed/archives/archives.component';
import { StatistiquesComponent } from './components/routed/statistiques/statistiques.component';
import { AideComponent } from './components/routed/aide/aide.component';
import { AProposComponent } from './components/routed/a-propos/a-propos.component';
import { ParametresComponent } from './components/routed/parametres/parametres.component';
import { SearchBarComponent } from './components/statics/search-bar/search-bar.component';
import { MedecinRoutingModule } from './medecin-routing.module';
import { AsideComponent } from './components/statics/aside/aside.component';
import { HeaderComponent } from './components/statics/header/header.component';
import { MedecinComponent } from './medecin.component';
import { InfosTraitementComponent } from './components/statics/mini-footer/infos-traitement/infos-traitement.component';
import { SubmitComponent } from './components/statics/mini-footer/submit/submit.component';
import { ChipsInputComponent } from './components/statics/chips-input/chips-input.component';
import { PatientIdComponent } from './components/statics/patient-id/patient-id.component';
import { AutocompleteInputComponent } from './components/statics/autocomplete-input/autocomplete-input.component';
import { MiniFooterComponent } from './components/statics/mini-footer/mini-footer.component';
import { UpdateMyProfileComponent } from './components/routed/parametres/update-my-profile/update-my-profile.component';
import { DeleteMyAccountComponent } from './components/routed/parametres/delete-my-account/delete-my-account.component';
import { FontSizeSelectionComponent } from './components/routed/parametres/font-size-selection/font-size-selection.component';
import { NewPhysicianComponent } from './components/routed/new-physician/new-physician.component';



@NgModule({
  declarations: [
    HomeComponent,
    ConsultationComponent,
    ExamenComponent,
    OrdonnanceComponent,
    TestLaboratoireComponent,
    RadiologieComponent,
    MesSuivisComponent,
    ProfilComponent,
    HistoriqueComponent,
    ArchivesComponent,
    StatistiquesComponent,
    AideComponent,
    AProposComponent,
    ParametresComponent,
    SearchBarComponent,
    HeaderComponent,
    AsideComponent,
    MedecinComponent,
    InfosTraitementComponent,
    SubmitComponent,
    ChipsInputComponent,
    PatientIdComponent,
    AutocompleteInputComponent,
    MiniFooterComponent,
    UpdateMyProfileComponent,
    DeleteMyAccountComponent,
    FontSizeSelectionComponent,
    NewPhysicianComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MedecinRoutingModule
  ],
  exports: [

  ]
})
export class MedecinModule { }
