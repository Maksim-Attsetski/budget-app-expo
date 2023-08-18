type TGetTimeString = (date: Date | number, language?: string) => string;

const oneHour = 3.6e6;
const oneMonth = 2.628e9;
const badHours = Date.now() - new Date().getHours() * oneHour;
const getDate = (add: number) => new Date(badHours + add).getTime();

class DateHelper {
  dates: {
    ago: number;
    now: number;
    someLater: number; // one hour later
    today: number;
    tomorrow: number;
    week: number;
    month: number;
  };

  constructor() {
    this.dates = {
      ago: -Infinity,
      now: Date.now(),
      someLater: Date.now() + oneHour, // one hour later
      today: getDate(0),
      tomorrow: getDate(8.64e7),
      week: getDate(6.048e8),
      month: getDate(oneMonth),
    };
  }

  withZero(value: string | number): string {
    return Number(value) > 9 ? '' + value : '0' + value;
  }

  getMinutes(min: number): string {
    const hours = Math.floor(min / 60);
    const minutes = this.withZero(Math.round(min % 60)) + ' мин.';

    return hours === 0 ? minutes : `${this.withZero(hours)} ч. ${minutes}`;
  }

  getDate(now: number, divider: string = '/'): string {
    const date = new Date(now);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${this.withZero(day)}${divider}${this.withZero(
      month
    )}${divider}${year}`;
  }

  getBeautifulDate(now: number, divider: string = '/'): string {
    const date = new Date(now);

    return date.toLocaleDateString('ru-RU', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  getMinMaxPerWeek(): { minDay: number; maxDay: number } {
    const now = new Date();
    now.setHours(0, 0, 0);
    const date = new Date(now.getTime());
    date.setDate(date.getDate() - date.getDay() - 1);
    const minDay = date.getTime();
    date.setDate(date.getDate() + 7);
    const maxDay = date.getTime();

    return { minDay, maxDay };
  }

  getMinMaxPerDay(): { minDay: number; maxDay: number } {
    const now = new Date();
    now.setHours(0, 0, 0);
    const date = new Date(now.getTime());
    const minDay = date.getTime();
    date.setDate(now.getDate() + 1);
    const maxDay = date.getTime();

    return { minDay, maxDay };
  }
}

export const dateHelper = new DateHelper();
