export const formattedDate = (date) => {
  const createdAtDate = date instanceof Date ? date : new Date(date);

  const day = createdAtDate.getDate();
  const monthIndex = createdAtDate.getMonth();
  const year = createdAtDate.getFullYear();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getOrdinal = (n) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  // Format date
  return `${getOrdinal(day)} ${months[monthIndex]} ${year}`;
};