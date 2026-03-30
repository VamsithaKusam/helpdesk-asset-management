import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private api = 'https://localhost:7287/api/tickets';

  constructor(private http: HttpClient) {}

  createTicket(data: any) {
    const payload = {
      title: data.title,
      description: data.description,
      priority: data.priority
    };
    return this.http.post(this.api, payload);
    }
   // The question mark is crucial here! It tells TypeScript this argument is optional.
  getAllTickets(searchTerm?: string) {
    if (searchTerm && searchTerm.trim() !== '') {
      return this.http.get<any[]>(`${this.api}/search?searchTerm=${searchTerm}`);
    }
    return this.http.get<any[]>(this.api);
  }
  updateStatus(data: any) {
    return this.http.put(`${this.api}/status`, data);
  }

  getMyTickets() {
    return this.http.get<any[]>(this.api);
  }

  // ✅ NEW
  getArchivedTickets() {
    return this.http.get<any[]>(`${this.api}/archived`);
  }

  // ✅ NEW
  archiveTickets() {
    return this.http.post(`${this.api}/archive`, {});
  }
  getAuditLogs() {
  return this.http.get<any[]>(`${this.api}/audit-logs`);
}
}