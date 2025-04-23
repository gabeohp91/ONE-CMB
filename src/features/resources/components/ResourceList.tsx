import React, { useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import { Resource } from '@/shared/types/models';
import ResourceItem from './ResourceItem';

interface ResourceListProps {
  resources: Resource[];
  height?: number;
  itemSize?: number;
  onSelectResource?: (resource: Resource) => void;
  className?: string;
  filter?: {
    type?: string;
    status?: string;
    search?: string;
  };
}

const ResourceList: React.FC<ResourceListProps> = ({
  resources,
  height = 500,
  itemSize = 80,
  onSelectResource,
  className = '',
  filter = {},
}) => {
  // Memoize filtered resources to prevent unnecessary recalculations
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      // Type filter
      if (filter.type && resource.type !== filter.type) {
        return false;
      }
      
      // Status filter
      if (filter.status && resource.status !== filter.status) {
        return false;
      }
      
      // Search filter
      if (filter.search) {
        const searchTerm = filter.search.toLowerCase();
        return (
          resource.name.toLowerCase().includes(searchTerm) || 
          resource.category.toLowerCase().includes(searchTerm) ||
          (resource.description?.toLowerCase().includes(searchTerm) || false)
        );
      }
      
      return true;
    });
  }, [resources, filter]);

  // Render an item in the virtualized list
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style} className="px-2 py-1">
      <ResourceItem 
        resource={filteredResources[index]} 
        onClick={onSelectResource}
      />
    </div>
  );

  // Show loading or empty states if needed
  if (!resources || resources.length === 0) {
    return (
      <div className="py-8 px-4 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">No resources available</p>
      </div>
    );
  }

  if (filteredResources.length === 0) {
    return (
      <div className="py-8 px-4 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">No resources match the current filters</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <FixedSizeList
        height={height}
        width="100%"
        itemCount={filteredResources.length}
        itemSize={itemSize}
        className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        {Row}
      </FixedSizeList>
    </div>
  );
};

export default React.memo(ResourceList);