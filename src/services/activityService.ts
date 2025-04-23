ts
import { get } from './api';

export const getActivities = async () => {
  // Replace '/activities' with your actual API endpoint
  return await get('/activities');
};