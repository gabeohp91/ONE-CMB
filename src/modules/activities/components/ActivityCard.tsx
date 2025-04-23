tsx
import React from 'react';

interface Activity {
  type: string;
  // Add other activity properties here later
}

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div>
      <p>Activity Type: {activity.type}</p>
    </div>
  );
};

export default ActivityCard;