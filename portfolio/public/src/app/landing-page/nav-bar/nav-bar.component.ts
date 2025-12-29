import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  currentLanguage: string = 'en';

  constructor(public languageService: LanguageService) {
    this.currentLanguage = this.languageService.getLanguage();
  }

  switchLanguage(lang: string): void {

    this.languageService.setLanguage(lang);
    this.currentLanguage = lang;
  }
}
