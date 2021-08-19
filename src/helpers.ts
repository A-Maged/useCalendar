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

/* https://github.com/yucatio/date-fns-calendar/blob/master/src/components/calendar/index.js */
export function getCalendarArray(date = new Date()) {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });

  return sundays.map(sunday =>
    eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) })
  );
}

export function getCurrentWeek({
  date = new Date(),
  calendar,
}: {
  date?: Date;
  calendar?: Date[][];
}) {
  calendar = calendar || getCalendarArray(date);
  const currentWeekIndex = getWeekOfMonth(date) - 1;
  const currentWeek = calendar[currentWeekIndex];
  return currentWeek;
}

export function getWeekDaysNames(date = new Date()) {
  return Array.from(Array(7)).map((_, i) =>
    format(addDays(startOfWeek(date), i), 'EEEE')
  );
}
