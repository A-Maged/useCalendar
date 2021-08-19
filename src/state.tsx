import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from 'react';

export type ICalendarContext = null | {
  events: any[];
  targetDate: Date;
  calendarMatrix: Date[][];
  currentWeek: Date[];
  nextWeek: () => void;
  previousWeek: () => void;
  nextCalendar: () => void;
  previousCalendar: () => void;
  goToToday: () => void;
  setTargetDate: Dispatch<SetStateAction<Date>>;
};
export const CalendarContext = createContext<ICalendarContext>(null);

type CalendarProps = ICalendarContext & {
  children: ReactNode;
  events: any[];
};
export function CalendarProvider({ children, ...props }: CalendarProps) {
  return (
    <CalendarContext.Provider value={props}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('Must wrap Element in a Calendar Provider');
  }

  return context;
}
