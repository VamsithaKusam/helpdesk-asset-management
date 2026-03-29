import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetService } from '../../../core/services/asset.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-assets',
  standalone: true,
  imports: [CommonModule],
  providers: [AssetService],
  template: `
    <div style="padding: 20px; font-family: Arial;">
      <h2>Asset Inventory</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <tr style="background-color: #27ae60; color: white; text-align: left;">
          <th style="padding: 12px;">Asset Tag</th>
          <th style="padding: 12px;">Name</th>
        </tr>
        <tr *ngFor="let asset of assets$ | async" style="border-bottom: 1px solid #ddd;">
          <td style="padding: 12px; font-weight: bold;">{{ asset.assetTag }}</td>
          <td style="padding: 12px;">{{ asset.name }}</td>
        </tr>
      </table>
    </div>
  `
})
export class ManageAssets implements OnInit {
  assets$!: Observable<any[]>;
  constructor(private assetService: AssetService) {}
  ngOnInit() {
    this.assets$ = this.assetService.getAllAssets(); // REAL DATABASE CALL
  }
}