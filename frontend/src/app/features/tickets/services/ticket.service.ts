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

getAllTickets() {
  return this.http.get(`${this.api}/paged`);
}

updateStatus(data: any) {
  return this.http.put(`${this.api}/status`, data);
}
 getMyTickets() {
  return this.http.get(this.api);
}

  
}