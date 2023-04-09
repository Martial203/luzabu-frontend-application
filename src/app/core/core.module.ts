import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RessourceNotFoundComponent } from './components/ressource-not-found/ressource-not-found.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { SharedModule } from '../shared/shared.module';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { HttpClient } from '@angular/common/http';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    RessourceNotFoundComponent,
    ErrorsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
    // TranslateModule.forRoot({
    //     loader: {
    //         provide: TranslateLoader,
    //         useFactory: HttpLoaderFactory,
    //         deps: [HttpClient]
    //     }
    // })
  ],
  exports: [
    RessourceNotFoundComponent
  ]
})
export class CoreModule { }

// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http);
// }
