export interface NFTAttribute {
  trait_type: Trait;
  value: string;
}

export type Trait = 'attack' | 'health' | 'speed';
