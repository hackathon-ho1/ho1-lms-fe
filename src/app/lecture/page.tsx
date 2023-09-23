'use client';

import { useState } from 'react';
import { LectureList } from '../../../lectureSample.json';

export type Course = {
  courseId: number;
  title: string;
  description: string;
  progress: number;
};

export default function LecturePage() {
  const [list, setList] = useState<Course[]>(LectureList);

  return (
    <div>
      <ul className='w-full h-auto grid gap-x-6 gap-y-24 grid-cols-3 px-5'>
        {list.map((item) => {
          return (
            <li className='rounded-lg border-2 border-stone-300' key={item.courseId}>
              <p className='text-xl'>{item.title}</p>
              <p>{item.description}</p>
              <div>
                <div className='h-2 w-full bg-opacity-30 rounded-full mb-1 bg-slate-950'>
                  <div style={{ width: `${item.progress}%` }} className='h-2 rounded-full bg-rose-600'></div>
                </div>
                <p className='text-end'>{item.progress}%완료</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
