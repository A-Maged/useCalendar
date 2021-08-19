import { renderHook, act } from '@testing-library/react-hooks';
import {
  addDays,
  addMonths,
  addWeeks,
  isToday,
  subMonths,
  subWeeks,
} from 'date-fns';
import { useCalendar } from '../src';

describe('useCalendar hook', () => {
  it('uses supplied date', () => {
    const date = new Date();
    const { result } = renderHook(() => useCalendar(date));

    expect(result.current.targetDate).toBe(date);
  });

  it('sets target date', () => {
    const date = new Date();
    const { result } = renderHook(() => useCalendar(date));

    act(() => {
      result.current.setTargetDate(addDays(date, 1));
    });

    expect(result.current.targetDate).toStrictEqual(addDays(date, 1));
  });

  it('adds a week', () => {
    const date = new Date();
    const { result } = renderHook(() => useCalendar(date));

    act(() => {
      result.current.nextWeek();
    });

    expect(result.current.targetDate).toStrictEqual(addWeeks(date, 1));
  });

  it('subtracts a week', () => {
    const date = new Date();
    const { result } = renderHook(() => useCalendar(date));

    act(() => {
      result.current.previousWeek();
    });

    expect(result.current.targetDate).toStrictEqual(subWeeks(date, 1));
  });

  it('adds a month', () => {
    const date = new Date();
    const { result } = renderHook(() => useCalendar(date));

    act(() => {
      result.current.nextCalendar();
    });

    expect(result.current.targetDate).toStrictEqual(addMonths(date, 1));
  });

  it('subtracts a month', () => {
    const date = new Date();
    const { result } = renderHook(() => useCalendar(date));

    act(() => {
      result.current.previousCalendar();
    });

    expect(result.current.targetDate).toStrictEqual(subMonths(date, 1));
  });

  it('goes to today', () => {
    const date = new Date();
    const { result } = renderHook(() => useCalendar(date));

    act(() => {
      result.current.goToToday();
    });

    expect(isToday(result.current.targetDate)).toBe(true);
  });
});
