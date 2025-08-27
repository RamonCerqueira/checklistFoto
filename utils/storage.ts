export interface ChecklistItem {
  id: number;
  plate: string;
  phone: string;
  photos: { url: string; description: string }[];
  createdAt: string;
}

const STORAGE_KEY = 'checklists';

export const getChecklists = (): ChecklistItem[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveChecklist = (item: ChecklistItem) => {
  const items = getChecklists();
  items.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const findByPlate = (plate: string): ChecklistItem[] => {
  const items = getChecklists();
  return items.filter((c) => c.plate.toUpperCase() === plate.toUpperCase());
};

export const clearAll = () => {
  localStorage.removeItem(STORAGE_KEY);
};