import { Component } from '@angular/core';
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

  constructor(private http: HttpClient) { }

  createEvent() {
    console.log('Creating event:', this.eventData);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!this.eventData.startDate || !this.eventData.endDate) {
      alert('Inserisci entrambe le date');
      return;
    }

    try {
      const [sYear, sMonth, sDay] = this.eventData.startDate.split('-').map(Number);
      const startDate = new Date(sYear, sMonth - 1, sDay);

      console.log('Parsed Start Date:', startDate);

      if (startDate < today) {
        alert('Impossibile creare un evento con una data passata');
        return;
      }

      const [eYear, eMonth, eDay] = this.eventData.endDate.split('-').map(Number);
      const endDate = new Date(eYear, eMonth - 1, eDay);

      console.log('Parsed End Date:', endDate);

      if (endDate < startDate) {
        alert('La data di fine non può essere precedente alla data di inizio');
        return;
      }
    } catch (e) {
      console.error('Date parsing error', e);
      alert('Errore nel formato delle date');
      return;
    }

    this.http.post<any>('/api/event', this.eventData).subscribe({
      next: (response) => {
        console.log('Event created successfully', response);
        alert('Hackathon creato con successo!');
        document.getElementById('closeModalBtn')?.click();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating event', error);
        alert('Errore durante la creazione dell\'evento.');
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
  }

}
