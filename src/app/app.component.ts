import { Component, HostBinding } from '@angular/core';
import { CryptoService } from './medecin/services/crypto.service';
import { Observable } from 'rxjs';
import { AppService } from './core/services/app.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostBinding('class') className = '';

  language$!: Observable<'french'|'english'>;
  darkTheme$!: Observable<boolean>;

  constructor(private appService: AppService, private overlay: OverlayContainer){
    // translate.setDefaultLang('fr');
    // translate.use('fr');
  }
  ngOnInit(): void {
    this.darkTheme$ = this.appService.darkTheme$;
    this.language$ = this.appService.language$;

    this.darkTheme$.subscribe(darkMode => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? 'darkMode' : '';
      (darkMode) ? this.overlay.getContainerElement().classList.add(darkClassName) : this.overlay.getContainerElement().classList.remove(darkClassName);
      (darkMode) ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light');
    });
  }

}
