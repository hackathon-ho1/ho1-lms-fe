'use client';

import { useEffect, useState } from 'react';
import { LectureList } from '../../../lectureSample.json';
import { useRouter } from 'next/navigation';
import Information from 'app/components/Infomation';

export type Course = {
  courseId: number;
  title: string;
  description: string;
  progress: number;
};

export default function LecturePage() {
  const [list, setList] = useState<Course[]>(LectureList);
  const [last, setLast] = useState<Course>({} as Course);

  const router = useRouter();

  const [lastIntersectingImage, setLastIntersectingImage] = useState<HTMLDivElement | null>(null);

  const getListThenSet = async () => {};

  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    console.log('page ? ', last);
    getListThenSet();
  }, [last]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (lastIntersectingImage) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(lastIntersectingImage);
    }
    return () => observer && observer.disconnect();
  }, [lastIntersectingImage]);

  return (
    <div>
      <Information />
      <ul className='w-full h-full grid gap-x-6 gap-y-24 grid-cols-3 px-5 max-h-[90vh] overflow-y-auto p-3'>
        {list.map((item) => {
          return (
            <li
              className='rounded-lg border border-stone-300 bg-white
            cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out py-4
            '
              onClick={() => {
                router.push(`/lecture/${item.title}`);
              }}
              key={item.courseId}
            >
              <p className='text-xl text-center'>{item.title}</p>
              <p className='py-3 pl-3'>{item.description}</p>
              <div>
                <div className='h-2 w-full bg-opacity-30 rounded-full mb-1 bg-gray-400 drop-shadow-xl'>
                  <div style={{ width: `${item.progress}%` }} className='h-2 rounded-full bg-red-500'></div>
                </div>
                <p className='text-end pb-2 pr-3'>{item.progress}% 완료</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
