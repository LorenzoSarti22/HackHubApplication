import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-active-hackathons',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './activeHackathons.html',
    styleUrl: './activeHackathons.css'
})
export class ActiveHackathons implements OnInit {
    events: any[] = [];
    loading = true;
    error: string | null = null;
    selectedEvent: any | null = null;
    isOrganizer: boolean = false;
    successMessage: string | null = null;
    errorMessage: string | null = null;
    pendingAction: { eventId: number, action: string } | null = null;

    constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.checkOrganizer();
        this.loadEvents();
    }

    checkOrganizer() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                this.isOrganizer = payload.role === 'ORGANIZER';
            } catch (e) {
                console.error('Error parsing token', e);
                this.isOrganizer = false;
            }
        }
    }

    loadEvents() {
        this.loading = true;
        this.http.get<any>('/api/event/active').subscribe({
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
                this.error = 'Impossibile caricare gli hackathon attivi.';
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    openDetails(event: any) {
        this.selectedEvent = event;
        this.successMessage = null;
        this.errorMessage = null;
        this.pendingAction = null;
    }

    closeDetails() {
        this.selectedEvent = null;
        this.successMessage = null;
        this.errorMessage = null;
        this.pendingAction = null;
    }

    updateStatus(eventId: number, action: string) {
        this.successMessage = null;
        this.errorMessage = null;
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
                    this.successMessage = 'Stato aggiornato con successo!';
                    this.pendingAction = null;
                    this.cdr.detectChanges();
                    setTimeout(() => {
                        this.successMessage = null;
                        this.closeDetails();
                        this.loadEvents();
                    }, 1500);
                } else {
                    this.errorMessage = 'Errore: ' + response.message;
                    this.pendingAction = null;
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error(err);
                this.errorMessage = 'Errore durante l\'aggiornamento dello stato.';
                this.pendingAction = null;
                this.cdr.detectChanges();
            }
        });
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
}
