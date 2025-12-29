import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
 public currentLanguage: string = 'en';

  constructor() {
    this.loadLanguage();
  }

  
  private loadLanguage(): void {
    if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('language');
    this.currentLanguage = savedLanguage ? savedLanguage : 'en';}
  }

  getLanguage(): string {
    return this.currentLanguage;
  }

  setLanguage(lang: string): void {
    this.currentLanguage = lang;
    if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);}
  }
}