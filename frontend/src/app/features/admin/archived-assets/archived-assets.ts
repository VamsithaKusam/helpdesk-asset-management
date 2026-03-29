import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetService } from '../../../core/services/asset.service';

@Component({
  selector: 'app-archived-assets',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; font-family: 'Segoe UI', sans-serif; max-width: 1000px; margin: auto;">
      <div style="border-bottom: 3px solid #6c757d; margin-bottom: 20px; padding-bottom: 10px;">
        <h2 style="color: #343a40; margin: 0;">Archived Inventory (Retired)</h2>
      </div>

      <table style="width: 100%; border-collapse: collapse; background: #f8f9fa; border-radius: 6px; overflow: hidden;">
        <tr style="background-color: #6c757d; color: white; text-align: left;">
          <th style="padding: 16px;">Asset Tag</th>
          <th style="padding: 16px;">Name</th>
          <th style="padding: 16px; text-align: center;">Action</th>
        </tr>
        <tr *ngFor="let asset of archivedAssets" style="border-bottom: 1px solid #dee2e6;">
          <td style="padding: 16px;">{{ asset.assetTag }}</td>
          <td style="padding: 16px;">{{ asset.name }}</td>
          <td style="padding: 16px; text-align: center;">
            <button (click)="restore(asset.id)" 
                    style="background: #28a745; color: white; border: none; padding: 6px 12px; cursor: pointer; border-radius: 4px; font-weight: bold;">
              Bring Back to Active
            </button>
          </td>
        </tr>
      </table>
      
      <div *ngIf="archivedAssets.length === 0" style="padding: 20px; text-align: center; color: #666;">
        No archived assets found.
      </div>
    </div>
  `
})
export class ArchivedAssets implements OnInit {
  archivedAssets: any[] = [];

  constructor(private assetService: AssetService) {}

  ngOnInit() { this.loadArchived(); }

  loadArchived() {
    this.assetService.getArchivedAssets().subscribe(res => this.archivedAssets = res);
  }

  restore(id: number) {
    this.assetService.restoreAsset(id).subscribe(() => {
      alert('Asset restored successfully!');
      this.loadArchived();
    });
  }
}