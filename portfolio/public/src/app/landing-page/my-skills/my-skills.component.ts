import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss'
})
export class MySkillsComponent implements AfterViewInit {
  @ViewChildren('skills') imageElements!: QueryList<ElementRef>;

  languageService = inject(LanguageService);

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Nur das sichtbare Bild animieren
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
