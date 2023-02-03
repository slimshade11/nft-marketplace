import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nft-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<footer class="flex items-center justify-center border">NFT Marketplace [2023]</footer> `,
})
export class FooterComponent {}
