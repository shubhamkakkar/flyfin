/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import arrowRight from './assets/arrow-right.png';

import './datePicker.css';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

export default function DatePicker() {
  const [baseDate, setBaseDate] = useState(new Date());
  const baseDateKey = `${baseDate.getMonth()}-${baseDate.getFullYear()}`

  const [monthDetails, setMonthDetails] = useState({});
  function nextMonth() {
    const _baseDate = new Date(baseDate);
    const nextMonthBaseDate = new Date(_baseDate.setMonth((_baseDate.getMonth() + 1)))
    setBaseDate(nextMonthBaseDate);
  }

  function prevMonth() {
    const _baseDate = new Date(baseDate);
    const nextMonthBaseDate = new Date(_baseDate.setMonth((_baseDate.getMonth() - 1)))
    setBaseDate(nextMonthBaseDate);
  }

  function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };


  function monthDetailsInitalizer() {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth()
    const date = new Date(Date.UTC(year, month, 1));
    const days = [];
    while (date.getUTCMonth() === month) {
      days.push(new Date(date));
      date.setUTCDate(date.getUTCDate() + 1);
    }
    const firstDay = days[0];
    const weekDayIndex = weekDays.indexOf(firstDay.toUTCString().substr(0,2));
    const emptyValues = Array(weekDayIndex).fill(Math.random())
    return [...emptyValues, ...days];
  }

  useEffect(() => {
    if (!monthDetails[baseDateKey]) {
      const payload = { ...monthDetails };
      payload[baseDateKey] = monthDetailsInitalizer()
      setMonthDetails(payload)
    }
  }, [baseDate])

  useEffect(() => {
    const today = new Date();
    const todayKey = `${today.getMonth()}-${today.getFullYear()}`
    if (!monthDetails[todayKey]) {
      const payload = { ...monthDetails };
      payload[todayKey] = monthDetailsInitalizer()
      setMonthDetails(payload)
    }
  }, [])

  return (
    <div className="date-picker">
      <div className="container">
        <div className="header">
          <div className="dp-button" onClick={prevMonth}>
            <div className="dp-inner">
              <img className="arrow-left" alt="left" src={arrowRight} />
            </div>
          </div>
          <div className="dp-month">
            <b>
              {monthNames[baseDate.getMonth()]}{' '}
              {baseDate.getFullYear()}
            </b>
          </div>
          <div className="dp-button dp-button-right" onClick={nextMonth}>
            <div className="dp-inner">
              <img className="arrow-right" alt="left" src={arrowRight} />
            </div>
          </div>
        </div>
        <div className="cal-container">
          <div className="cal-header">
            {weekDays.map((dayName, index) => (
              <div key={`${dayName}-${index}`} className="day-item-container week-item">
                {dayName}
              </div>
            ))}
          </div>
          <div className="calender-container">
          {monthDetails && monthDetails[baseDateKey] && monthDetails[baseDateKey].map && (
            <div className="days-container">
              {monthDetails[baseDateKey].map((day, index) => (
                <div
                  className={`day-item-container`}
                  key={day?.getDate ? `${day.getDate()}-${day.getMonth()}-${day.getFullYear()}` : index}>
                  <div className={day?.getDate ? isToday(day) ? 'day-today' : '' : ''}>
                    {day.getDate && day.getDate()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}