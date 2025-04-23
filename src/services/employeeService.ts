ts
import { get } from './api';

export const getEmployees = async () => {
  return await get('/employees');
};