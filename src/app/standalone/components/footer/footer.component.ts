import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nftm-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<footer class="text-center p-4 border">This is Footer</footer> `,
})
export class FooterComponent {}
