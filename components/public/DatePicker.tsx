"use client";

import { useState, useRef, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfDay, isToday } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

type DatePickerProps = {
  value: string; // YYYY-MM-DD format
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  label?: string;
};

export function DatePicker({ value, onChange, placeholder = "Select date", id, label }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    return value ? startOfMonth(new Date(value)) : startOfMonth(new Date());
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value) : null;

  useEffect(() => {
    if (value) {
      setCurrentMonth(startOfMonth(new Date(value)));
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get first day of week for the month (0 = Sunday)
  const firstDayOfWeek = monthStart.getDay();
  
  // Add empty cells for days before month starts
  const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => null);
  
  // Get days from previous month to fill the first week
  const prevMonthEnd = endOfMonth(subMonths(currentMonth, 1));
  const prevMonthDays = Array.from({ length: firstDayOfWeek }, (_, i) => {
    const day = prevMonthEnd.getDate() - firstDayOfWeek + i + 1;
    return new Date(prevMonthEnd.getFullYear(), prevMonthEnd.getMonth(), day);
  });

  // Get days from next month to fill the last week
  const totalCells = emptyDays.length + daysInMonth.length;
  const remainingCells = 42 - totalCells; // 6 rows × 7 days = 42
  const nextMonthStart = addMonths(currentMonth, 1);
  const nextMonthDays = Array.from({ length: remainingCells }, (_, i) => {
    return new Date(nextMonthStart.getFullYear(), nextMonthStart.getMonth(), i + 1);
  });

  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];

  const handleDateSelect = (date: Date) => {
    onChange(format(date, "yyyy-MM-dd"));
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setIsOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    onChange(format(today, "yyyy-MM-dd"));
    setIsOpen(false);
  };

  const displayValue = value ? format(new Date(value), "MM/dd/yyyy") : "";

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-slate-600 dark:text-slate-400">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type="text"
          readOnly
          value={displayValue}
          placeholder={placeholder}
          onClick={() => setIsOpen(!isOpen)}
          className="h-11 w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50/50 px-3 pr-10 text-sm outline-none transition placeholder:text-slate-500 focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/20 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:bg-slate-900 dark:focus:ring-[var(--primary)]/20"
        />
        <CalendarIcon
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          aria-hidden="true"
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-lg border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {format(currentMonth, "MMMM yyyy")}
            </h3>
            <button
              type="button"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Days of week */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="flex h-8 items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-400"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {allDays.map((date, idx) => {
              if (!date) return <div key={`empty-${idx}`} className="h-8" />;
              
              const isCurrentMonth = isSameMonth(date, currentMonth);
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const isCurrentDay = isToday(date);

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => handleDateSelect(date)}
                  className={`
                    h-8 w-8 rounded-full text-xs font-medium transition
                    ${!isCurrentMonth ? "text-slate-300 dark:text-slate-600" : "text-slate-900 dark:text-slate-100"}
                    ${isSelected
                      ? "bg-slate-200 border border-slate-900 text-slate-900 dark:bg-slate-700 dark:border-slate-100 dark:text-slate-100"
                      : isCurrentDay
                      ? "bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }
                  `}
                >
                  {format(date, "d")}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-medium text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleToday}
              className="text-xs font-medium text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
