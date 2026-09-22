import { AfterViewInit, PLATFORM_ID, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-projekt3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projekt3.component.html',
  styleUrl: './projekt3.component.scss'
})
export class Projekt3Component implements AfterViewInit{
  @ViewChild('img', { static: false }) imageElement!: ElementRef;

   
  
    private readonly platformId = inject(PLATFORM_ID);

  languageService = inject(LanguageService);
  
    ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.imageElement.nativeElement.classList.add('show');
            }
          });
        },
        { threshold: 0.2 }
      );
  
      if (this.imageElement) {
        observer.observe(this.imageElement.nativeElement);
      }
    }
}