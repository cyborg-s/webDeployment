import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../services/language.service';
@Component({
  selector: 'app-projekt2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projekt2.component.html',
  styleUrl: './projekt2.component.scss'
})
export class Projekt2Component implements AfterViewInit{
  @ViewChild('img', { static: false }) imageElement!: ElementRef;

   
  
    languageService = inject(LanguageService);
  
    ngAfterViewInit() {
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