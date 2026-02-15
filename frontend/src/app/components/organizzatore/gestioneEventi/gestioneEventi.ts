import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestioneEventi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestioneEventi.html',
  styleUrl: './gestioneEventi.css'
})
export class GestioneEventi {

  eventData = {
    name: '',
    startDate: '',
    endDate: '',
    rulesUrl: ''
  };

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  createEvent() {
    console.log('Creating event:', this.eventData);
    this.errorMessage = null;
    this.successMessage = null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!this.eventData.startDate || !this.eventData.endDate) {
      this.errorMessage = 'Inserisci entrambe le date.';
      this.cdr.detectChanges();
      return;
    }

    try {
      const [sYear, sMonth, sDay] = this.eventData.startDate.split('-').map(Number);
      const startDate = new Date(sYear, sMonth - 1, sDay);

      console.log('Parsed Start Date:', startDate);

      if (startDate < today) {
        this.errorMessage = 'Impossibile creare un evento con una data passata.';
        this.cdr.detectChanges();
        return;
      }

      const [eYear, eMonth, eDay] = this.eventData.endDate.split('-').map(Number);
      const endDate = new Date(eYear, eMonth - 1, eDay);

      console.log('Parsed End Date:', endDate);

      if (endDate < startDate) {
        this.errorMessage = 'La data di fine non può essere antecendente alla data di inizio.';
        this.cdr.detectChanges();
        return;
      }
    } catch (e) {
      console.error('Date parsing error', e);
      this.errorMessage = 'Errore nel formato delle date.';
      this.cdr.detectChanges();
      return;
    }

    this.http.post<any>('/api/event', this.eventData).subscribe({
      next: (response) => {
        console.log('Event created successfully', response);
        this.successMessage = 'Hackathon creato con successo!';
        this.cdr.detectChanges();
        setTimeout(() => {
          document.getElementById('closeModalBtn')?.click();
          this.resetForm();
        }, 1500);
      },
      error: (error) => {
        console.error('Error creating event', error);
        this.errorMessage = 'Errore durante la creazione dell\'evento.';
        this.cdr.detectChanges();
      }
    });
  }

  resetForm() {
    this.eventData = {
      name: '',
      startDate: '',
      endDate: '',
      rulesUrl: ''
    };
    this.errorMessage = null;
    this.successMessage = null;
  }

}
