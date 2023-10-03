import { useCallback, useState } from 'react';
import addMonths from 'date-fns/addMonths';
import addWeeks from 'date-fns/addWeeks';
import subMonths from 'date-fns/subMonths';
import subWeeks from 'date-fns/subWeeks';

import { WeekStartsOn, getCalendarArray, getCurrentWeek } from './helpers';

export const useCalendar = (
  date = new Date(),
  weekStartsOn: WeekStartsOn = WeekStartsOn.SUNDAY
) => {
  const [targetDate, setTargetDate] = useState(date);

  const calendarMatrix = getCalendarArray({ date: targetDate, weekStartsOn });
  const currentWeek = getCurrentWeek({
    date: targetDate,
    calendar: calendarMatrix,
  });

  const nextCalendar = useCallback(() => {
    const dayInNextCalendar = addMonths(targetDate, 1);
    setTargetDate(dayInNextCalendar);
  }, [targetDate]);

  const previousCalendar = useCallback(() => {
    const dayInPreviousCalendar = subMonths(targetDate, 1);
    setTargetDate(dayInPreviousCalendar);
  }, [targetDate]);

  const nextWeek = useCallback(() => {
    const dayInNextWeek = addWeeks(targetDate, 1);
    setTargetDate(dayInNextWeek);
  }, [targetDate]);

  const previousWeek = useCallback(() => {
    const dayInPreviousWeek = subWeeks(targetDate, 1);
    setTargetDate(dayInPreviousWeek);
  }, [targetDate]);

  const goToToday = useCallback(() => {
    setTargetDate(new Date());
  }, []);

  return {
    targetDate,
    calendarMatrix,
    currentWeek,
    setTargetDate,
    nextWeek,
    previousWeek,
    nextCalendar,
    previousCalendar,
    goToToday,
  };
};
