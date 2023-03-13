export type Trait = 'attack' | 'health' | 'speed';

export interface NFTAttribute {
  trait_type: Trait;
  value: string;
}
