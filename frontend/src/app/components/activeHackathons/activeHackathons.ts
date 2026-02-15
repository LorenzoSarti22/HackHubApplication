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

    constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        console.log('ActiveHackathons initialized');
        this.loading = true;
        this.http.get<any>('/api/event/active').subscribe({
            next: (response) => {
                console.log('Data received', response);
                if (response.success) {
                    this.events = response.data;
                } else {
                    this.error = response.message;
                }
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Error fetching events', err);
                this.error = 'Impossibile caricare gli hackathon attivi.';
                this.loading = false;
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
            default: return 'primary';
        }
    }
}
