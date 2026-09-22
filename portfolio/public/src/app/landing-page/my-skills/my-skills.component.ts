import { AfterViewInit, PLATFORM_ID, Component, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss'
})
export class MySkillsComponent implements AfterViewInit {
  @ViewChildren('skills') imageElements!: QueryList<ElementRef>;

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
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.2 }
    );

    this.imageElements.forEach((image) => {
      observer.observe(image.nativeElement);
    });
  }
}
