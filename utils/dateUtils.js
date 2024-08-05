import { format, addDays } from 'date-fns';

export const defaultFormat = "dd-MM-yyyy";

export function formatDate(inputDate) {
  if (!inputDate) {
    return format(new Date(), defaultFormat);
  }
  return format(new Date(inputDate), defaultFormat);
}

export function formatDateRange(dateRange) {
  if (!dateRange || dateRange.length !== 2) {
    const today = new Date();
    return [format(today, defaultFormat), format(addDays(today, 1), defaultFormat)];
  }
  return dateRange.map((date) =>
    date ? format(new Date(date), defaultFormat) : ""
  );
}