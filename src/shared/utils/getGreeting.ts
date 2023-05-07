export const getGreeting = () => {
  const hours = new Date().getHours();

  if (hours > 0 && hours < 12) {
    return 'Доброе утро';
  }
  if (hours > 11 && hours < 18) {
    return 'Добрый день';
  }
  return 'Добрый вечер';
};
