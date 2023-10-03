import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getWeekOfMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

/* 0 is Sunday, 1 is Monday, and so on */
export enum WeekStartsOn {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

/* https://github.com/yucatio/date-fns-calendar/blob/master/src/components/calendar/index.js */
export function getCalendarArray(args?: {
  date?: Date;
  weekStartsOn?: WeekStartsOn;
}) {
  const date = args?.date || new Date();
  const weekStartsOn = args?.weekStartsOn || WeekStartsOn.SUNDAY;

  const saturdays = eachWeekOfInterval(
    {
      start: startOfMonth(date),
      end: endOfMonth(date),
    },
    { weekStartsOn }
  );

  return saturdays.map(saturday =>
    eachDayOfInterval({
      start: saturday,
      end: endOfWeek(saturday, { weekStartsOn }),
    })
  );
}

export function getCurrentWeek({
  date = new Date(),
  calendar,
}: {
  date?: Date;
  calendar?: Date[][];
}) {
  calendar = calendar || getCalendarArray({ date });
  const currentWeekIndex = getWeekOfMonth(date) - 1;
  const currentWeek = calendar[currentWeekIndex];
  return currentWeek;
}

export function getWeekDaysNames(date = new Date()) {
  return Array.from(Array(7)).map((_, i) =>
    format(addDays(startOfWeek(date), i), 'EEEE')
  );
}
