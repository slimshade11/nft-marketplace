import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { NFT } from '@home/models/nft.model';

import { NftItemComponent } from './nft-item.component';

describe('NftItemComponent', () => {
  let component: NftItemComponent;
  let fixture: ComponentFixture<NftItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NftItemComponent],
      imports: [CardModule],
    }).compileComponents();

    const nft: NFT = { description: '', image: 'string', name: 'string', attributes: [] };

    fixture = TestBed.createComponent(NftItemComponent);
    component = fixture.componentInstance;
    component.nft = nft;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
