import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-active-hackathons',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './activeHackathons.html',
    styleUrl: './activeHackathons.css'
})
export class ActiveHackathons implements OnInit {
    events: any[] = [];
    loading = true;
    error: string | null = null;
    selectedEvent: any | null = null;
    eventStaff: any[] = [];

    constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.loadEvents();
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
    }

    closeDetails() {
        this.selectedEvent = null;
        this.eventStaff = [];
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
