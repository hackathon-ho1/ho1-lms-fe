'use client';

import React, { useState, useEffect, Fragment } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import dummy from '../../../sample.json';
import Gotgam1 from '../../../public/gotgam1.svg';
import Gotgam2 from '../../../public/gotgam2.svg';
import Gotgam3 from '../../../public/gotgam3.svg';
import Gotgam4 from '../../../public/gotgam4.svg';
import Gotgam5 from '../../../public/gotgam5.svg';

function MyActivityPage() {
  const today = dayjs();
  const [monthData, setMonthData] = useState({
    targetMonth: dayjs(),
    startDay: dayjs().startOf('month').day(),
    daysInMonth: dayjs().daysInMonth(),
  });
  const [myActivities, setMyActivities] = useState<GotgamList[]>(dummy);
  const [myActivity, setMyActivity] = useState<GotgamList>();

  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD');
    const todaysActivity = myActivities.find((activity) => dayjs(activity.date).format('YYYY-MM-DD') === today);
    setMyActivity(todaysActivity || ({} as GotgamList));
  }, [myActivities]);

  const weekdaysData = [
    { day: '일', color: 'text-red-500' },
    { day: '월' },
    { day: '화' },
    { day: '수' },
    { day: '목' },
    { day: '금' },
    { day: '토', color: 'text-blue-500' },
  ];

  const getGotgamSvg = (dailyStudy: GotgamList) => {
    if (dailyStudy.stage === 0) return Gotgam4;
    if (dailyStudy.stage <= 3) return Gotgam1;
    if (dailyStudy.stage <= 6) return Gotgam2;
    return Gotgam3;
  };

  const handleClick = (value: GotgamList) => {
    setMyActivity(value);
  };

  return (
    <div className='w-full h-full flex flex-row justify-center items-center min-w-[800px] min-h-[800px] gap-4'>
      <div className='w-1/2 h-2/3 flex flex-col gap-10 justify-center items-center shadow'>
        <div className='flex flex-row justify-start items-center gap-3'>
          <button> 이전 달 </button>
          <p className='font-semibold text-2xl'>{monthData.targetMonth.month() + 1}월</p>
          <button> 다음 달 </button>
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
          {myActivities.map((value: GotgamList, index: number) => {
            const currentDay = dayjs(monthData.targetMonth).date(index + 1);
            let SvgComponent;
            if (currentDay.isAfter(today)) {
              SvgComponent = Gotgam5;
            } else {
              const dayData = myActivities.find((d) => dayjs(d.date).isSame(currentDay, 'day'));
              if (dayData) {
                SvgComponent = getGotgamSvg(dayData);
              }
            }
            return (
              <button key={`day-${index}`} className={`w-10 h-10 rounded opacity-90`} onClick={() => handleClick(value)}>
                {SvgComponent && <Image src={SvgComponent} alt='Gotgam' />}
              </button>
            );
          })}
          {Array.from({ length: monthData.daysInMonth - myActivities.length }).map((_, index) => (
            <div key={`end-${index}`} className='w-10 h-10'>
              <Image src={Gotgam5} alt='Gotgam' />
            </div>
          ))}
        </div>
      </div>
      <div className='w-1/2 h-full flex justify-center items-center'>
        <div className='w-full h-2/3 min-w-[400px] min-h-[300px] p-5 flex flex-col gap-3 shadow'>
          <div className='font-bold text-xl block mb-3'>활동내역</div>
          <div className='w-full h-1/2 flex flex-col gap-1 overflow-y-auto p-2'>
            <p className='mb-3 font-semibold'>학습한 강의 목록</p>
            {myActivity?.achievedLectureList && myActivity?.achievedHelpList.length > 0 ? (
              myActivity?.achievedLectureList.map((lecture) => (
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
          <div className='w-full h-1/2 flex flex-col gap-1 overflow-y-auto p-2'>
            <p className='mb-3 font-semibold'>내가 도와준 문제</p>
            {myActivity?.achievedHelpList && myActivity?.achievedHelpList.length > 0 ? (
              myActivity?.achievedHelpList.map((helpList) => (
                <Fragment>
                  <p className='pl-2'>{helpList.questionTitle}</p>
                </Fragment>
              ))
            ) : (
              <>도와준 문제가 없어요!</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyActivityPage;
