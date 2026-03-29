import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ 
  providedIn: 'root' 
})
export class AssetService {
  private apiUrl = 'https://localhost:7287/api/assets'; 

  constructor(private http: HttpClient) {}

  getAllAssets() { return this.http.get<any[]>(this.apiUrl); }
  getMyAssets() { return this.http.get<any[]>(`${this.apiUrl}/myassets`); }
}