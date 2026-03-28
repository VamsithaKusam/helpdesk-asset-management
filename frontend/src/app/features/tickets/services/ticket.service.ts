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


  getMyTickets() {
    return this.http.get(`${this.api}/my`);
  }

  getAllTickets() {
    return this.http.get(this.api);
  }
}