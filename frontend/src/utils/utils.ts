import { format } from 'date-fns';

export const formatToLocalDateTime = (utcDateTime: string) => {
  const date = new Date(utcDateTime + 'Z'); // Ensure the date string is treated as UTC
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};



export const formatDateTimeUTC = (dateTime: string): string => {
    const date = new Date(dateTime);
    return date.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
};
  