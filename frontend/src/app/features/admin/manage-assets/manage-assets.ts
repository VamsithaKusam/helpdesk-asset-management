import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetService } from '../../../core/services/asset.service';
import { UserService } from '../../../core/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-assets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AssetService, UserService],
  template: `
    <div style="padding: 20px; font-family: Arial; max-width: 1000px; margin: auto;">
      <h2>Asset Management</h2>

      <!-- 1. Stats Counter -->
      <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <div style="background: #27ae60; color: white; padding: 15px; border-radius: 8px; flex: 1;">
          Total Assets: {{ assets.length }}
        </div>
        <div style="background: #2980b9; color: white; padding: 15px; border-radius: 8px; flex: 1;">
          Available: {{ getAvailableCount() }}
        </div>
      </div>

      <!-- 2. Add New Asset Form -->
      <div style="background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 30px; border-top: 4px solid #27ae60;">
        <h3>Add New Asset</h3>
        <div style="display: flex; gap: 10px;">
          <input [(ngModel)]="newAsset.name" placeholder="Asset Name (e.g. Dell Monitor)" style="padding: 10px; flex: 2; border: 1px solid #ddd;">
          <input [(ngModel)]="newAsset.assetTag" placeholder="Tag (e.g. MON-001)" style="padding: 10px; flex: 1; border: 1px solid #ddd;">
          <button (click)="addNewAsset()" style="background: #27ae60; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 4px;">Add Asset</button>
        </div>
      </div>

      <!-- 3. Assignment Form (Shows when 'Assign' is clicked) -->
      <div *ngIf="selectedAsset" style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #ddd;">
        <h3>Assigning: {{ selectedAsset.name }}</h3>
        <select [(ngModel)]="selectedUserId" style="padding: 8px; margin-right: 10px;">
          <option *ngFor="let user of users" [value]="user.id">{{ user.name }}</option>
        </select>
        <button (click)="submitAssignment()" style="background: #27ae60; color: white; border: none; padding: 8px 15px; cursor: pointer;">Confirm</button>
        <button (click)="selectedAsset = null" style="background: #e74c3c; color: white; border: none; padding: 8px 15px; margin-left: 5px;">Cancel</button>
      </div>

      <!-- 4. Asset Table -->
      <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
  <tr style="background-color: #27ae60; color: white; text-align: left;">
    <th style="padding: 12px;">Asset Tag</th>
    <th style="padding: 12px;">Name</th>
    <th style="padding: 12px; text-align: center;">Availability / Action</th>
  </tr>
  <tr *ngFor="let asset of assets" style="border-bottom: 1px solid #ddd;">
    <td style="padding: 12px; font-weight: bold;">{{ asset.assetTag }}</td>
    <td style="padding: 12px;">{{ asset.name }}</td>
    <td style="padding: 12px; text-align: center;">
      
      <button *ngIf="!asset.isAssigned" 
              (click)="selectForAssignment(asset)" 
              style="background: #3498db; color: white; border: none; padding: 8px 16px; cursor: pointer; border-radius: 4px; width: 120px;">
        Assign
      </button>

      <span *ngIf="asset.isAssigned" 
            style="color: #e74c3c; font-weight: bold; background: #fadbd8; padding: 4px 12px; border-radius: 20px; font-size: 0.85em;">
        Not Available
      </span>

    </td>
  </tr>
</table>
      
      <div *ngIf="assets.length === 0" style="text-align: center; padding: 40px; color: #999;">
        No assets found in inventory.
      </div>
    </div>
  `
})
export class ManageAssets implements OnInit {
  assets: any[] = [];
  users: any[] = [];
  newAsset = { name: '', assetTag: '' };
  selectedAsset: any = null;
  selectedUserId: any = null;

  constructor(private assetService: AssetService, private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.loadData(); }

  loadData() {
    this.assetService.getAllAssets().subscribe(res => {
      this.assets = res;
      this.cdr.detectChanges();
    });
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.cdr.detectChanges();
    });
  }

  getAvailableCount() {
    return this.assets.filter(a => !a.isAssigned).length;
  }

 addNewAsset() {
    if (!this.newAsset.name || !this.newAsset.assetTag) {
      alert("Please fill in both Name and Tag");
      return;
    }

    const assetPayload = {
        id: 0, 
        name: this.newAsset.name,
        assetTag: this.newAsset.assetTag,
        categoryId: 1, // Sending the ID is enough now!
        status: 'Available',
        isAssigned: false
    };

    console.log("SENDING TO BACKEND:", assetPayload);

    this.assetService.addAsset(assetPayload).subscribe({
      next: (res) => {
        alert('Asset added successfully!');
        this.newAsset = { name: '', assetTag: '' }; // Clear inputs
        this.loadData(); // Refresh table
      },
      error: (err) => {
        console.error("FULL ERROR OBJECT:", err);
        alert("Validation Error: " + JSON.stringify(err.error?.errors || err.error));
      }
    });
  }
  selectForAssignment(asset: any) { this.selectedAsset = asset; }

  submitAssignment() {
    if (!this.selectedUserId) return;
    const payload = { AssetTag: this.selectedAsset.assetTag, UserId: Number(this.selectedUserId) };
    this.assetService.assignAsset(payload).subscribe(() => {
      alert('Assigned!');
      this.selectedAsset = null;
      this.loadData();
    });
  }
}