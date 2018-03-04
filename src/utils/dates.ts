const dateFormatter = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

export const formatDate = (datetime: number | Date): string =>
  dateFormatter.format(new Date(datetime));
