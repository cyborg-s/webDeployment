import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { CommonModule } from '@angular/common';

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
 

  languageService = inject(LanguageService);

  ngAfterViewInit() {
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
