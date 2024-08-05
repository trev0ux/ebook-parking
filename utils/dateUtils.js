import { format, addDays } from 'date-fns';

export const defaultFormat = "dd-MM-yyyy";

export function formatDate(inputDate) {
  if (!inputDate) {
    return format(new Date(), defaultFormat);
  }
  return format(new Date(inputDate), defaultFormat);
}

export function formatDateRange(dateRange) {
    if (!dateRange || Object.keys(dateRange).length === 0) {
      const today = new Date();
      return { start: format(today, defaultFormat), end: format(addDays(today, 1), defaultFormat)};
    }
    
    if (Array.isArray(dateRange) && dateRange.length === 2) {
      return dateRange.map(date =>
        date ? format(new Date(date), defaultFormat) : ""
      );
    }
  
    if (dateRange.start && dateRange.end) {
      return [
        format(new Date(dateRange.start), defaultFormat),
        format(new Date(dateRange.end), defaultFormat)
      ];
    }
  
    console.error('Invalid dateRange format');
    return ['Invalid range', 'Invalid range'];
  }