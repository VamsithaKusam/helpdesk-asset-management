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
    <div style="padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 1000px; margin: auto;">
  <div style="border-bottom: 3px solid var(--vc-orange); margin-bottom: 20px; padding-bottom: 10px;">
    <h2 style="color: var(--vc-navy); margin: 0;">Asset Management</h2>
  </div>

  <div style="display: flex; gap: 20px; margin-bottom: 20px;">
    <div style="background: var(--vc-navy); color: white; padding: 15px 20px; border-radius: 6px; flex: 1; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <strong style="font-size: 1.1em;">TOTAL ASSETS</strong> 
      <span style="font-size: 1.5em; float: right; font-weight: bold;">{{ assets.length }}</span>
    </div>
    <div style="background: var(--vc-orange); color: white; padding: 15px 20px; border-radius: 6px; flex: 1; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <strong style="font-size: 1.1em;">AVAILABLE</strong> 
      <span style="font-size: 1.5em; float: right; font-weight: bold;">{{ getAvailableCount() }}</span>
    </div>
  </div>

  <div style="background: white; padding: 25px; border-radius: 6px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); margin-bottom: 30px; border-top: 5px solid var(--vc-navy);">
    <h3 style="color: var(--vc-navy); margin-top: 0; margin-bottom: 15px;">Add New Asset</h3>
    <div style="display: flex; gap: 15px;">
      <input [(ngModel)]="newAsset.name" placeholder="Asset Name" style="padding: 12px; flex: 2; border: 1px solid #ccc; border-radius: 4px; outline-color: var(--vc-orange);">
      <input [(ngModel)]="newAsset.assetTag" placeholder="Tag" style="padding: 12px; flex: 1; border: 1px solid #ccc; border-radius: 4px; outline-color: var(--vc-orange);">
      <button (click)="addNewAsset()" style="background: var(--vc-navy); color: white; border: none; padding: 12px 25px; cursor: pointer; border-radius: 4px; font-weight: bold; text-transform: uppercase;">Add Asset</button>
    </div>
  </div>

  <div *ngIf="selectedAsset" style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 25px; border-left: 6px solid var(--vc-orange); box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
    <h3 style="color: var(--vc-navy); margin-top: 0;">Assigning: <span style="color: var(--vc-orange);">{{ selectedAsset.name }}</span></h3>
    <select [(ngModel)]="selectedUserId" style="padding: 10px; margin-right: 15px; border-radius: 4px; border: 1px solid #ccc; min-width: 250px;">
      <option *ngFor="let user of users" [value]="user.id">{{ user.name }}</option>
    </select>
    <button (click)="submitAssignment()" style="background: var(--vc-orange); color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 4px; font-weight: bold;">Confirm</button>
    <button (click)="selectedAsset = null" style="background: #e0e0e0; color: #333; border: none; padding: 10px 20px; margin-left: 10px; cursor: pointer; border-radius: 4px; font-weight: bold;">Cancel</button>
  </div>

  <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.08); border-radius: 6px; overflow: hidden;">
    <tr style="background-color: var(--vc-navy); color: white; text-align: left;">
      <th style="padding: 16px;">Asset Tag</th>
      <th style="padding: 16px;">Name</th>
      <th style="padding: 16px; text-align: center;">Status / Action</th>
    </tr>
    <tr *ngFor="let asset of assets" style="border-bottom: 1px solid #eee;">
      <td style="padding: 16px; font-weight: bold; color: var(--vc-navy);">{{ asset.assetTag }}</td>
      <td style="padding: 16px; color: #555;">{{ asset.name }}</td>
      <td style="padding: 16px; text-align: center;">
        <button *ngIf="!asset.isAssigned" (click)="selectForAssignment(asset)" 
                style="background: transparent; color: var(--vc-navy); border: 2px solid var(--vc-navy); padding: 6px 16px; cursor: pointer; border-radius: 20px; font-weight: bold; width: 120px;">
          Assign
        </button>
        <span *ngIf="asset.isAssigned" 
              style="color: var(--vc-orange); font-weight: bold; background: #fff0eb; padding: 6px 16px; border-radius: 20px; font-size: 0.85em; display: inline-block; min-width: 90px; text-align: center; border: 1px solid #fbdad0;">
          In Use
        </span>
      </td>
    </tr>
  </table>
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