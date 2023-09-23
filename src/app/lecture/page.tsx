'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Information from 'app/components/Infomation';
import { getCourseList } from 'app/lib/api';

export type Course = {
  courseId: number;
  title: string;
  description: string;
  progress: number;
};

export default function LecturePage() {
  const [list, setList] = useState<Course[]>([]);
  const [cursor, setCursor] = useState<number>(0);
  const loading = useRef(false);

  useEffect(() => {
    if (loading.current) return;
    loading.current = true;

    getCourseList(cursor).then((res) => {
      setList((prev) => [...prev, ...res.data]);
      if (res.data.length === 0) return;
      loading.current = false;
    });
  }, [cursor]);

  const router = useRouter();
  const observer = useRef<IntersectionObserver | null>(null);
  const [lastItemRef, setLastItemRef] = useState<HTMLLIElement | null>(null);

  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setCursor(list[list.length - 1].courseId ?? 0);
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (lastItemRef) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(lastItemRef);
    }
    return () => observer && observer.disconnect();
  }, [lastItemRef]);

  console.log(list);

  return (
    <div>
      <Information />
      <ul className='w-full h-full grid gap-x-6 gap-y-24 grid-cols-3 px-5 max-h-[90vh] overflow-y-auto p-3 cursor-pointer'>
        {list.map((item, index) => (
          <li
            ref={index === list.length - 1 ? setLastItemRef : null}
            className='rounded-lg border border-stone-300 bg-white
              cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out py-4'
            onClick={() => {
              router.push(`/lecture/${item.courseId}`);
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
        ))}
      </ul>
    </div>
  );
}
