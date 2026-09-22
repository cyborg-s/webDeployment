import { Component, inject } from '@angular/core';
import { Projekt1Component } from './projekt1/projekt1.component';
import { Projekt2Component } from './projekt2/projekt2.component';
import { Projekt3Component } from './projekt3/projekt3.component';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [Projekt1Component, Projekt2Component, Projekt3Component, CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  languageService = inject(LanguageService);
}
