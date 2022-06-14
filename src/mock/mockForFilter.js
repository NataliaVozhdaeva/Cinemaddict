import { filter } from '../utils/filters';

export const generateFilter = () =>
  Object.entries(filter).map(([filterName, filterCount]) => ({
    name: filterName,
    count: filterCount,
  }));
