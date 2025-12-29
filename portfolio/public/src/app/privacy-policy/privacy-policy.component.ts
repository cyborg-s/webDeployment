import { Component, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  languageService = inject(LanguageService);
}
