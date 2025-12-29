import { Component, inject } from '@angular/core';
import { JoinComponent } from './join/join.component';
import { SharkyComponent } from './sharky/sharky.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [JoinComponent, SharkyComponent, PokedexComponent, CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  languageService = inject(LanguageService);
}
