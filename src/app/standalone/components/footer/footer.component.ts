import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nftm-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<footer class="flex items-center justify-center bg-slate-800">NFT Marketplace [2023]</footer> `,
})
export class FooterComponent {}
