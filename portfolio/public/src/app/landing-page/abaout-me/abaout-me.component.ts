import { AfterViewInit, PLATFORM_ID, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-abaout-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './abaout-me.component.html',
  styleUrl: './abaout-me.component.scss'
})
export class AbaoutMeComponent implements AfterViewInit {
  @ViewChild('roundPic', { static: false }) imageElement!: ElementRef;
  @ViewChild('picLine', { static: false }) lineElement!: ElementRef;
 

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
            this.lineElement.nativeElement.classList.add('show');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (this.imageElement) {
      observer.observe(this.imageElement.nativeElement);
    }
    if (this.lineElement) {
      observer.observe(this.lineElement.nativeElement);
    }
  }
}
