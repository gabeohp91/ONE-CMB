/**
 * Resource types
 */
export type ResourceType = 'equipment' | 'software' | 'document' | 'service';

/**
 * Resource status types
 */
export type ResourceStatus = 'available' | 'in-use' | 'maintenance' | 'retired';

/**
 * Resource model definition
 */
export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  category: string;
  status: ResourceStatus;
  description?: string;
  assignedTo?: string;
  assignedDate?: string;
  expiryDate?: string;
  vendor?: string;
  cost?: number;
  location?: string;
  properties?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Equipment specific resource
 */
export interface Equipment extends Resource {
  type: 'equipment';
  serialNumber?: string;
  purchaseDate?: string;
  warrantyExpiryDate?: string;
  maintenanceHistory?: {
    date: string;
    description: string;
    performedBy: string;
  }[];
}

/**
 * Software specific resource
 */
export interface Software extends Resource {
  type: 'software';
  version?: string;
  licenseKey?: string;
  licenseExpiryDate?: string;
  supportExpiryDate?: string;
  installationDate?: string;
  compatibleWith?: string[];
}

/**
 * Document specific resource
 */
export interface Document extends Resource {
  type: 'document';
  url?: string;
  fileType?: string;
  fileSize?: number;
  tags?: string[];
  authorId?: string;
  authorName?: string;
  version?: string;
  lastModifiedById?: string;
  lastModifiedByName?: string;
}

/**
 * Resource request
 */
export interface ResourceRequest {
  name: string;
  type: ResourceType;
  category: string;
  description?: string;
  requestedById: string;
  requestedByName?: string;
  requestReason?: string;
  dateNeeded?: string;
  status: 'pending' | 'approved' | 'rejected' | 'fulfilled';
  approvedById?: string;
  approvedByName?: string;
  createdAt: string;
  updatedAt: string;
}