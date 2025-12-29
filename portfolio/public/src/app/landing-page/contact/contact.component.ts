import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  languageService = inject(LanguageService);
  http = inject(HttpClient);

  isChecked = false;

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  @ViewChild('succsess', { static: false }) succsess!: ElementRef;

  isFormValid(): boolean {
    return (
      this.contactData.name.trim() !== '' &&
      this.contactData.email.trim() !== '' &&
      this.contactData.message.trim() !== '' &&
      this.isChecked
    );
  }

  onSubmit(ngForm: NgForm) {
    if (!ngForm.valid) {
      return;
    }

    this.http.post('/api/contact', this.contactData).subscribe({
      next: () => {
        ngForm.resetForm();
        this.isChecked = false;
        this.showSuccess();
      },
      error: (err) => {
        console.error('Contact API error:', err);
      }
    });
  }

  private showSuccess() {
    this.succsess.nativeElement.classList.remove('none');
    setTimeout(() => {
      this.succsess.nativeElement.classList.add('none');
    }, 800);
  }
}
