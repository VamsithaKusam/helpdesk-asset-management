import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AssetService {
  private apiUrl = 'https://localhost:7287/api/assets'; 

  constructor(private http: HttpClient) {}

  getAllAssets() { 
    return this.http.get<any[]>(this.apiUrl); 
  }

  getMyAssets() { 
    return this.http.get<any[]>(`${this.apiUrl}/myassets`); 
  }

  // Final version matching the DTO: AssetTag (string) and UserId (number)
  assignAsset(payload: { AssetTag: string, UserId: number }) {
    return this.http.post(`${this.apiUrl}/assign`, payload);
  }
  addAsset(asset: any) {
 
  return this.http.post(this.apiUrl, asset);
}
// Call this when an employee wants to return a device
  returnAsset(assetId: number) {
    return this.http.post(`${this.apiUrl}/return/${assetId}`, {});
  }
  getArchivedAssets() {
  return this.http.get<any[]>(`${this.apiUrl}/assets/archived`);
}

archiveAsset(id: number) {
  return this.http.post(`${this.apiUrl}/assets/archive/${id}`, {});
}

restoreAsset(id: number) {
  return this.http.post(`${this.apiUrl}/assets/restore/${id}`, {});
}
}