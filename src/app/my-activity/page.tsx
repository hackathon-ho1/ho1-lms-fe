'use client';

import React, { useState, useEffect, Fragment } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Gotgam1 from '../../../public/gotgam1.svg';
import Gotgam2 from '../../../public/gotgam2.svg';
import Gotgam3 from '../../../public/gotgam3.svg';
import Gotgam4 from '../../../public/gotgam4.svg';
import Gotgam5 from '../../../public/gotgam5.svg';
import { getGotgamDetail, getGotgamList } from 'app/lib/api';

function MyActivityPage() {
  const today = dayjs();
  const [monthData, setMonthData] = useState({
    targetMonth: dayjs(),
    targetDate: dayjs().format('YYYY-MM-DD'),
    startDay: dayjs().startOf('month').day(),
    daysInMonth: dayjs().daysInMonth(),
  });
  const [myActivities, setMyActivities] = useState<number[]>([]);
  const [myActivity, setMyActivity] = useState<AchievedLectureList[]>([]);

  useEffect(() => {
    const monthNumber = monthData.targetMonth.month();
    const formattedMonth = dayjs().month(monthNumber).format('MMM');

    getGotgamList(formattedMonth.toLowerCase()).then((res) => {
      setMyActivities(res.data);
    });
    getGotgamDetail(String(monthData.targetDate)).then((res) => {
      setMyActivity(res.data);
    });
  }, [monthData.targetDate, monthData.targetMonth, monthData.startDay, monthData.daysInMonth]);

  const weekdaysData = [
    { day: '일', color: 'text-red-500' },
    { day: '월' },
    { day: '화' },
    { day: '수' },
    { day: '목' },
    { day: '금' },
    { day: '토', color: 'text-blue-500' },
  ];

  const getGotgamSvg = (stage: number) => {
    if (stage === 0) return Gotgam4;
    if (stage <= 3) return Gotgam1;
    if (stage <= 6) return Gotgam2;
    return Gotgam3;
  };

  const handleClick = (value: string) => {
    setMonthData({
      ...monthData,
      targetDate: value,
    });
  };

  return (
    <div className='w-full h-full flex flex-row justify-center items-center min-w-[800px] min-h-[800px] gap-4'>
      <div className='w-1/2 h-2/3 flex flex-col gap-10 justify-center items-center shadow bg-white rounded-md'>
        <div className='flex flex-row justify-start items-center gap-3'>
          <button
            onClick={() => {
              setMonthData({
                ...monthData,
                targetMonth: monthData.targetMonth.subtract(1, 'month'),
              });
            }}
          >
            {' '}
            이전 달{' '}
          </button>
          <p className='font-semibold text-2xl'>{monthData.targetMonth.month() + 1}월</p>
          <button
            onClick={() => {
              setMonthData({
                ...monthData,
                targetMonth: monthData.targetMonth.add(1, 'month'),
              });
            }}
          >
            다음 달
          </button>
        </div>
        <div className='grid grid-cols-7 gap-4 min-w-[400px] min-h-[300px]'>
          {weekdaysData.map(({ day, color }) => (
            <div key={day} className={`w-10 h-10 text-center ${color || ''}`}>
              {day}
            </div>
          ))}
          {Array.from({ length: monthData.startDay }).map((_, index) => (
            <div key={`start-${index}`} className='w-10 h-10 bg-transparent' />
          ))}
          {myActivities.slice(0, dayjs(monthData.targetMonth).daysInMonth()).map((activityValue, index) => {
            const currentDay = dayjs(monthData.targetMonth).date(index + 1);
            let SvgComponent;

            if (currentDay.isAfter(today)) {
              SvgComponent = Gotgam5;
            } else {
              SvgComponent = getGotgamSvg(activityValue);
            }

            return (
              <button key={`day-${index}`} className={`w-10 h-10 rounded opacity-90`} onClick={() => handleClick(currentDay.format('YYYY-MM-DD'))}>
                {SvgComponent && <Image src={SvgComponent} alt='Gotgam' />}
              </button>
            );
          })}
        </div>
      </div>
      <div className='w-1/2 h-full flex justify-center items-center'>
        <div className='w-full h-2/3 min-w-[400px] min-h-[300px] p-5 flex flex-col gap-3 shadow bg-white rounded-md'>
          <div className='font-bold text-xl block mb-3'>활동내역</div>
          <div className='w-full h-1full flex flex-col gap-1 overflow-y-auto p-2'>
            <p className='mb-3 font-semibold'>학습한 강의 목록</p>
            {myActivity && myActivity?.length > 0 ? (
              myActivity?.map((lecture) => (
                <Fragment>
                  <p>- {lecture.courseTitle}</p>
                  <p className='pl-4'>{lecture.chatperTitle}</p>
                  <p className='pl-6'>{lecture.lectureTitle}</p>
                </Fragment>
              ))
            ) : (
              <>학습한 강의가 없네요. ㅠㅠ</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyActivityPage;
