import { Component, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  languageService = inject(LanguageService);
}
