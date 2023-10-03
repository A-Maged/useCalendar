import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  useCalendar,
  CalendarProvider,
  useCalendarContext,
  WeekStartsOn,
} from '../src';
import { format, getDate } from 'date-fns';

const App = () => {
  const calendar = useCalendar(new Date(), WeekStartsOn.SUNDAY);

  const {
    calendarMatrix,
    nextWeek,
    nextCalendar,
    previousWeek,
    previousCalendar,
    goToToday,
    targetDate,
  } = calendar;

  return (
    <div>
      <h1>Actions</h1>

      <button onClick={previousCalendar}>previous month</button>
      <button onClick={nextCalendar}>next month</button>
      <button onClick={previousWeek}>previous week</button>
      <button onClick={nextWeek}>next week</button>
      <button onClick={goToToday}>Go to today</button>

      <h1>Target Date: {format(targetDate, 'dd-MM-yyyy')}</h1>

      <h1>Calendar</h1>
      {calendarMatrix.map(week => (
        <>
          {week.map(day => (
            <span>{getDate(day)} | </span>
          ))}

          <br />
        </>
      ))}

      <CalendarProvider {...calendar} events={[]}>
        <WeekExample />
      </CalendarProvider>
    </div>
  );
};

type MyCustomEvent = {
  summary: string;
  description: string;
};

function WeekExample() {
  const { currentWeek, events } = useCalendarContext<MyCustomEvent>();

  return (
    <>
      <h1>Week</h1>

      {currentWeek.map(day => (
        <span>{getDate(day)} | </span>
      ))}
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
