import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useCalendar } from '../.';
import { format, getDate, getMonth } from 'date-fns';

const App = () => {
  const {
    calendarMatrix,
    nextWeek,
    nextCalendar,
    previousWeek,
    previousCalendar,
    currentWeek,
    goToToday,
    targetDate,
  } = useCalendar();

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

      <h1>Week</h1>
      {currentWeek.map(day => (
        <span>{getDate(day)} | </span>
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
