'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCourseDetail } from 'app/lib/api';

export default function LectureDetail() {
  const [courses, setCourses] = useState<Course>();
  const [expandedChapterIds, setExpandedChapterIds] = useState<number[]>([]);
  const [currentClicked, setCurrentClicked] = useState<{ courseId: number | null; chapterId: number | null }>({ courseId: null, chapterId: null });

  useEffect(() => {
    getCourseDetail(1).then((res) => {
      setCourses(res.data);
    });
  }, []);

  const router = useRouter();

  const toggleArrayValue = <T,>(array: T[], value: T, setArray: React.Dispatch<React.SetStateAction<T[]>>) => {
    if (array.includes(value)) {
      setArray((prev) => prev.filter((item) => item !== value));
    } else {
      setArray((prev) => [...prev, value]);
    }
  };

  const handleToggle = (chapterId: number) => {
    toggleArrayValue(expandedChapterIds, chapterId, setExpandedChapterIds);
  };
  const handleChapterClick = (courseId: number, chapterId: number) => {
    if (currentClicked.courseId === courseId && currentClicked.chapterId === chapterId) {
      setCurrentClicked({ courseId: null, chapterId: null });
    } else {
      setCurrentClicked({ courseId, chapterId });
    }
  };

  return (
    <div className='w-full h-full flex flex-row justify-start items-start bg-[#E5E7EB] '>
      <div className='w-[25%] h-full bg-gray-200 max-w-[400px] min-w-[300px] flex flex-col justify-center items-center text-white'>
        {courses?.chapters.map((course) => (
          <div key={course.chapterId} className='w-full'>
            <div className='w-full h-16 bg-[#171717] border border-[#464646] flex justify-between items-center px-3 text-sm'>
              <div
                className={`w-5 h-5 rounded-full border-2
            ${course.progress === 100 ? ' border-yellow-400 text-yellow-400 font-bold' : 'border-white'}
            text-center flex justify-center items-center`}
              >
                {course.progress === 100 && '✓'}
              </div>
              <div>{course.chapterTitle}</div>
              <div>
                <span className='mr-2'>
                  {course.doneCount} / {course.lectureCount}
                </span>
                <button onClick={() => handleToggle(course.chapterId)}>{expandedChapterIds.includes(course.chapterId) ? '▲' : '▼'}</button>
              </div>
            </div>
            {expandedChapterIds.includes(course.chapterId) && (
              <div>
                {course.lectures.map((lecture) => (
                  <button
                    key={lecture.lectureId}
                    className='w-full h-16 bg-[#232325] border border-[#464646] flex justify-between items-center px-3 text-sm'
                    onClick={() => handleChapterClick(course.chapterId, lecture.lectureId)}
                  >
                    <div
                      className={`rounded-full border-2
                              ${
                                currentClicked.courseId === course.chapterId && currentClicked.chapterId === lecture.lectureId
                                  ? 'w-5 h-5 border-blue-500 '
                                  : lecture.isDone
                                  ? ' w-5 h-5 border-yellow-400 '
                                  : 'w-5 h-5 border-white'
                              }
                            text-center flex justify-center items-center`}
                    >
                      {course.progress === 100 && currentClicked.courseId === course.chapterId && currentClicked.chapterId === lecture.lectureId ? (
                        <div className='w-2 h-2 rounded-full bg-blue-500' />
                      ) : lecture.isDone ? (
                        <div className='w-2 h-2 rounded-full bg-yellow-400' />
                      ) : currentClicked.courseId === course.chapterId && currentClicked.chapterId === lecture.lectureId ? (
                        <div className='w-2 h-2 rounded-full bg-blue-500' />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className='flex justify-center items-center w-[94%]'>{lecture.lectureTitle}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='w-full h-full bg-gray-300 flex flex-row justify-end items-end'>
        <button
          className='w-24 h-10 bg-white mb-10 mr-10 rounded font-bold'
          disabled={currentClicked.courseId === null || currentClicked.chapterId === null}
          onClick={() => {
            router.push(`/lecture/${currentClicked.courseId}/${currentClicked.chapterId}`);
          }}
        >
          실습하기
        </button>
      </div>
    </div>
  );
}
