import { Component, OnInit , inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component'
import { NavBarComponent } from './landing-page/nav-bar/nav-bar.component';
import { FooterComponent } from './landing-page/footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LandingPageComponent, NavBarComponent, FooterComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'portfolio';

  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  setDefaultLang = 'en'

  ngOnInit() {

  }

  languageService = inject(LanguageService);

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }

}
