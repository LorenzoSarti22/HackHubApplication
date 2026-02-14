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
