import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import * as en from '@angular/common/locales/en';
import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _darkTheme$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _language$: BehaviorSubject<'french'|'english'> = new BehaviorSubject<'french'|'english'>('french');
  
  constructor(private overlay: OverlayContainer) {
    const theme = localStorage.getItem('theme');
    if(theme=='dark'){
      this._darkTheme$.next(true);
    }else{
      this._darkTheme$.next(false);
    }

    let language = localStorage.getItem('language');
    if(language=="french" || language=="english"){
      this._language$.next(language);
    }
  }

  get darkTheme$(): Observable<boolean>{
    return this._darkTheme$.asObservable();
  }

  get language$(): Observable<'french'|'english'>{
    return this._language$.asObservable();
  }

  switchLanguage(language: 'french'|'english'): void{
    this._language$.next(language);
    (language==="french") ? registerLocaleData(fr.default, 'fr-FR') : registerLocaleData(en.default, 'en-US');
    localStorage.setItem('language', language);
  }

  switchTheme(theme: boolean): void{
    this._darkTheme$.next(theme);
  }
}