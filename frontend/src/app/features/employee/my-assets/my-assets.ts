import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetService } from '../../../core/services/asset.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-my-assets',
  standalone: true,
  imports: [CommonModule],
  providers: [AssetService],
  template: `
    <div style="padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 1000px; margin: auto;">
      <div style="border-bottom: 3px solid var(--vc-orange); margin-bottom: 20px; padding-bottom: 10px;">
        <h2 style="color: var(--vc-navy); margin: 0;">My Assigned Devices</h2>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.08); border-radius: 6px; overflow: hidden;">
        <tr style="background-color: var(--vc-navy); color: white; text-align: left;">
          <th style="padding: 16px;">Asset Tag</th>
          <th style="padding: 16px;">Name</th>
          <th style="padding: 16px; text-align: center;">Action</th>
        </tr>
        
        <tr *ngFor="let asset of assetsSubject$ | async" style="border-bottom: 1px solid #eee;">
          <td style="padding: 16px; font-weight: bold; color: var(--vc-navy);">{{ asset.assetTag }}</td>
          <td style="padding: 16px; color: #555;">{{ asset.name }}</td>
          <td style="padding: 16px; text-align: center;">
            <button (click)="returnDevice(asset.id, asset.name)" 
                    style="background: white; color: var(--vc-orange); border: 2px solid var(--vc-orange); padding: 8px 16px; cursor: pointer; border-radius: 20px; font-weight: bold;">
              Return to IT
            </button>
          </td>
        </tr>
      </table>
    </div>
  `
})
export class MyAssets implements OnInit {
  // A BehaviorSubject acts as a "live stream" of your data
  public assetsSubject$ = new BehaviorSubject<any[]>([]);

  constructor(private assetService: AssetService) {}

  ngOnInit() {
    this.loadMyAssets();
  }

  loadMyAssets() {
    this.assetService.getMyAssets().subscribe(data => {
      // We push the new data into the stream
      this.assetsSubject$.next(data);
    });
  }

  returnDevice(assetId: number, assetName: string) {
    if (confirm(`Confirm return of ${assetName}?`)) {
      this.assetService.returnAsset(assetId).subscribe({
        next: () => {
          alert('Asset successfully returned!');
          
          // HERE IS THE MAGIC:
          // 1. Get the current list from the stream
          const currentAssets = this.assetsSubject$.value;
          // 2. Filter out the one we just returned
          const updatedAssets = currentAssets.filter(a => a.id !== assetId);
          // 3. Push the smaller list back into the stream
          this.assetsSubject$.next(updatedAssets);
          
          // The UI will now update INSTANTLY because it's watching this stream.
        },
        error: (err) => alert('Error returning asset.')
      });
    }
  }
}