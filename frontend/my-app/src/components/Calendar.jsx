import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isToday from 'dayjs/plugin/isToday'

import { useHistory } from 'react-router-dom';

dayjs.locale('ko');
dayjs.extend(isToday);

function CalendarHeader({ date, onClickPrev, onClickNext }) {
   return (
     <>
       <div className="d-flex align-items-center justify-content-center text-vintage-yellow bg-vintage-blue w-100 rounded-top">
         <button
           onClick={onClickPrev}
           className="btn btn-text text-vintage-yellow py-5"
         >
           prev
         </button>
         <h1 className="mx-4">{dayjs(date).format('MMMM yyyy')}</h1>
         <button
           onClick={onClickNext}
           className="btn btn-text text-vintage-yellow py-5"
         >
           next
         </button>
       </div>
       <div className="d-flex w-100 bg-vintage-yellow">
         {[
           'SUNDAY',
           'MONDAY',
           'TUESDAY',
           'WEDNESDAY',
           'THURSDAY',
           'FRIDAY',
           'SATURDAY',
         ].map((day, index) => {
           const textColor =
             index === 0
               ? 'text-vintage-red'
               : index === 6
               ? 'text-vintage-blue'
               : '';
           return (
            <strong
              style={widthOneSeventhStyle}
              className={`px-1 py-3 ${textColor}`}
              key={day}
            >
              {day}
            </strong>
           );
         })}
       </div>
     </>
   );
}

const widthOneSeventhStyle = {
  width: "calc(100% / 7)",
}

function CalendarEmptyCell() {
  return (
    <div style={widthOneSeventhStyle}>{`\t`}</div>
  );
}

function CalendarDayCell({ year, month, date, history }) {
  const dateInfo = dayjs().set('year', year).set('month', month).set('date', date);
  const isToday = dayjs(dateInfo).isToday();

  return (
    <div
      style={widthOneSeventhStyle}
      className={`p-1 ${isToday ? 'today' : ''}`}
      onClick={() => {
        // history.push({
        //   pathname: `/detail`,
        //   state: {
        //     year,
        //     month,
        //     date,
        //   },
        // });
      }}
    >
      <span className="text">{date}</span>
    </div>
  );
}

function CalendarBody({ date }) {
  const dateInfo = dayjs(date).set('date', 1);
  const daysInMonth = dateInfo.daysInMonth();
  const firstDay = dateInfo.day(); // 0(Sun) ~ 6(Sat)
  const year = dateInfo.year();
  const month = dateInfo.month();

  return (
    <div className="d-flex flex-wrap w-100 h-100">
      {
        Array(firstDay)
        .fill()
        .map((_, index) => (
          <CalendarEmptyCell key={index} />
        ))
      }
      {
        Array(daysInMonth)
        .fill()
        .map((_, index) => (
          <CalendarDayCell
            key={index}
            year={year}
            month={month}
            date={index + 1}
          />
        ))
      }
    </div>
  )
}

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const history = useHistory();

  const prevMonth = () => {
    setDate(dayjs(date).add(-1, 'month'));
  };

  const nextMonth = () => {
    setDate(dayjs(date).add(1, 'month'));
  };

  return (
    <div className="d-flex flex-column w-100 h-100 text-center">
      <CalendarHeader
        date={date}
        onClickPrev={prevMonth}
        onClickNext={nextMonth}
      />
      <CalendarBody
        date={date}
      />
    </div>
  );
};

export default Calendar;