import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
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
export class GestioneEventi implements OnInit {

  events: any[] = [];
  loading = true;
  error: string | null = null;
  eventToDelete: any = null;

  eventData = {
    name: '',
    startDate: '',
    endDate: '',
    rulesUrl: ''
  };

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.loading = true;
    this.error = null;
    this.http.get<any>('/api/event/organizer').subscribe({
      next: (response) => {
        if (response.success) {
          this.events = response.data;
        } else {
          this.error = response.message;
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Impossibile caricare i tuoi hackathon.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteErrorMessage: string | null = null;
  globalSuccessMessage: string | null = null;

  confirmDelete(event: any) {
    this.eventToDelete = event;
    this.deleteErrorMessage = null;
  }

  deleteEvent() {
    if (!this.eventToDelete || !this.eventToDelete.eventId) return;

    this.http.delete<any>(`/api/event/${this.eventToDelete.eventId}`).subscribe({
      next: (response) => {
        if (response.success) {
          this.globalSuccessMessage = 'Hackathon eliminato con successo.';
          document.getElementById('closeDeleteModalBtn')?.click();
          this.eventToDelete = null;
          this.loadEvents();
          setTimeout(() => {
            this.globalSuccessMessage = null;
            this.cdr.detectChanges();
          }, 3000);
        } else {
          this.deleteErrorMessage = 'Errore: ' + response.message;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Delete error', err);
        this.deleteErrorMessage = 'Impossibile eliminare l\'evento. Ricorda che puoi eliminare solo eventi appena creati o chiusi completamente.';
        this.cdr.detectChanges();
      }
    });
  }

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
        this.errorMessage = 'La data di fine non può essere antecedente alla data di inizio.';
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
          this.loadEvents(); // Reload the list after creation
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

  getStatusColor(status: string): string {
    switch (status) {
      case 'SUBSCRIPTION': return 'success';
      case 'WAITING': return 'warning';
      case 'RUNNING': return 'primary';
      case 'EVALUATING': return 'info';
      case 'EVALUATED': return 'secondary';
      case 'CLOSED': return 'danger';
      default: return 'primary';
    }
  }

  // --- LOGICA MODAL DI MODIFICA / GESTIONE STAFF ---

  selectedEvent: any | null = null;
  eventStaff: any[] = [];
  judges: any[] = [];
  mentors: any[] = [];
  selectedJudgeId: number | null = null;
  selectedMentorId: number | null = null;
  pendingAction: { eventId: number, action: string } | null = null;

  editErrorMessage: string | null = null;
  editSuccessMessage: string | null = null;

  openEditModal(event: any) {
    this.selectedEvent = event;
    this.editErrorMessage = null;
    this.editSuccessMessage = null;
    this.pendingAction = null;
    this.selectedJudgeId = null;
    this.selectedMentorId = null;
    this.eventStaff = [];

    // Fetch details (including staff and assessments)
    this.http.get<any>(`/api/event/${event.eventId}/details`).subscribe({
      next: (res) => {
        if (res.success && res.data && res.data.staff) {
          this.eventStaff = res.data.staff;
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load event details', err)
    });

    this.loadJudges();
    this.loadMentors();
  }

  closeEditModal() {
    this.selectedEvent = null;
    this.editErrorMessage = null;
    this.editSuccessMessage = null;
    this.pendingAction = null;
    this.judges = [];
    this.mentors = [];
    this.eventStaff = [];
    this.selectedJudgeId = null;
    this.selectedMentorId = null;
    this.loadEvents();
  }

  loadJudges() {
    this.http.get<any>('/api/user/role/JUDGE').subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.judges = res.data;
        } else {
          this.judges = [];
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load judges', err);
        this.judges = [];
        this.cdr.detectChanges();
      }
    });
  }

  loadMentors() {
    this.http.get<any>('/api/user/role/MENTOR').subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.mentors = res.data;
        } else {
          this.mentors = [];
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load mentors', err);
        this.mentors = [];
        this.cdr.detectChanges();
      }
    });
  }

  updateStatus(eventId: number, action: string) {
    this.editErrorMessage = null;
    this.editSuccessMessage = null;
    this.pendingAction = { eventId, action };
  }

  cancelStatusChange() {
    this.pendingAction = null;
  }

  confirmStatusChange() {
    if (!this.pendingAction) return;

    const { eventId, action } = this.pendingAction;

    this.http.patch<any>(`/api/event/${eventId}/${action}`, {}).subscribe({
      next: (response) => {
        if (response.success) {
          this.editSuccessMessage = 'Stato aggiornato con successo!';
          this.pendingAction = null;
          this.selectedEvent.status = response.data.status; // Aggiorno lo stato in tempo reale
          this.cdr.detectChanges();
          setTimeout(() => {
            this.editSuccessMessage = null;
          }, 2000);
        } else {
          this.editErrorMessage = 'Errore: ' + response.message;
          this.pendingAction = null;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error(err);
        this.editErrorMessage = 'Errore durante l\'aggiornamento dello stato.';
        this.pendingAction = null;
        this.cdr.detectChanges();
      }
    });
  }

  addJudge() {
    if (!this.selectedEvent || !this.selectedJudgeId) return;

    const payload = {
      eventId: this.selectedEvent.eventId,
      userId: this.selectedJudgeId
    };

    this.http.post<any>('/api/staff/judge', payload).subscribe({
      next: (res) => {
        this.editSuccessMessage = 'Giudice aggiunto con successo!';
        this.selectedJudgeId = null;
        // Ricarico lo staff per aggiornare la visualizzazione
        this.openEditModal(this.selectedEvent);
      },
      error: (err) => {
        console.error(err);
        this.editErrorMessage = 'Errore durante l\'aggiunta del giudice. Potrebbe essere già presente.';
        this.cdr.detectChanges();
      }
    });
  }

  addMentor(): void {
    if (!this.selectedEvent || !this.selectedMentorId) return;

    const payload = {
      eventId: this.selectedEvent.eventId,
      userId: this.selectedMentorId
    };

    this.http.post<any>('/api/staff/mentor', payload).subscribe({
      next: (res) => {
        this.editSuccessMessage = 'Mentore aggiunto con successo!';
        this.selectedMentorId = null;
        // Ricarico lo staff per aggiornare la visualizzazione
        this.openEditModal(this.selectedEvent);
      },
      error: (err) => {
        console.error(err);
        this.editErrorMessage = 'Errore durante l\'aggiunta del mentore. Potrebbe essere già presente.';
        this.cdr.detectChanges();
      }
    });
  }

}
