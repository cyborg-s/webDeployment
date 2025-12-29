import { Component, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
    
  

  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }


  currentLanguage: string = 'en';

  constructor(public languageService: LanguageService) {
    this.currentLanguage = this.languageService.getLanguage();
  }

  switchLanguage(lang: string): void {

    this.languageService.setLanguage(lang);
    this.currentLanguage = lang;
  }
}
