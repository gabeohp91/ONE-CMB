// src/data/resources/resourceTypes.ts

export type ResourceType = 'equipment' | 'software' | 'personnel' | 'other';

export const resourceTypeOptions: { value: ResourceType; label: string }[] = [
  { value: 'equipment', label: 'Equipment' },
  { value: 'software', label: 'Software' },
  { value: 'personnel', label: 'Personnel' },
  { value: 'other', label: 'Other' },
];