'use client';

import { useEffect, useState } from 'react';
import { LectureList } from '../../../lectureSample.json';

export type Course = {
  courseId: number;
  title: string;
  description: string;
  progress: number;
};

export default function LecturePage() {
  const [list, setList] = useState<Course[]>(LectureList);
  const [last, setLast] = useState<Course>({} as Course);

  const [lastIntersectingImage, setLastIntersectingImage] = useState<HTMLDivElement | null>(null);

  const getListThenSet = async () => {};

  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        //뷰포트에 마지막 이미지가 들어오고, page값에 1을 더하여 새 fetch 요청을 보내게됨 (useEffect의 dependency배열에 page가 있음)
        // 현재 타겟을 unobserve한다.
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    console.log('page ? ', last);
    getListThenSet();
  }, [last]);

  useEffect(() => {
    //observer 인스턴스를 생성한 후 구독
    let observer: IntersectionObserver;
    if (lastIntersectingImage) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      //observer 생성 시 observe할 target 요소는 불러온 이미지의 마지막아이템(randomImageList 배열의 마지막 아이템)으로 지정
      observer.observe(lastIntersectingImage);
    }
    return () => observer && observer.disconnect();
  }, [lastIntersectingImage]);

  return (
    <div>
      <ul className='w-full h-auto grid gap-x-6 gap-y-24 grid-cols-3 px-5'>
        {list.map((item) => {
          return (
            <li className='rounded-lg border border-stone-300' key={item.courseId}>
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
