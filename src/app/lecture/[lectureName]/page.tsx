'use client';

import React, { useState } from 'react';
import dummy from '../../../../lecture-sample.json';

export default function LectureDetail() {
  const [courses, setCourses] = useState<Course[]>(dummy);
  const [expandedChapterIds, setExpandedChapterIds] = useState<number[]>([]);
  const [currentClicked, setCurrentClicked] = useState<{ courseId: number | null; chapterId: number | null }>({ courseId: null, chapterId: null });

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
        {courses.map((course) => (
          <div key={course.courseId} className='w-full'>
            <div className='w-full h-16 bg-[#171717] border border-[#464646] flex justify-between items-center px-3 text-sm'>
              <div
                className={`w-5 h-5 rounded-full border-2
            ${course.progress === 100 ? ' border-yellow-400 text-yellow-400 font-bold' : 'border-white'}
            text-center flex justify-center items-center`}
              >
                {course.progress === 100 && '✓'}
              </div>
              <div>{course.title}</div>
              <div>
                <span className='mr-2'>
                  {course.chapters.filter((chapter) => chapter.lectures.some((lecture) => lecture.isDone)).length}/{course.chapters.length}
                </span>
                <button onClick={() => handleToggle(course.courseId)}>{expandedChapterIds.includes(course.courseId) ? '▲' : '▼'}</button>
              </div>
            </div>
            {expandedChapterIds.includes(course.courseId) && (
              <div>
                {course.chapters.map((chapter) => (
                  <button
                    key={chapter.chapterId}
                    className='w-full h-16 bg-[#232325] border border-[#464646] flex justify-between items-center px-3 text-sm'
                    onClick={() => handleChapterClick(course.courseId, chapter.chapterId)}
                  >
                    <div
                      className={`rounded-full border-2
                              ${
                                currentClicked.courseId === course.courseId && currentClicked.chapterId === chapter.chapterId
                                  ? 'w-5 h-5 border-blue-500 '
                                  : chapter.progress === 100
                                  ? ' w-5 h-5 border-yellow-400 '
                                  : 'w-5 h-5 border-white'
                              }
                            text-center flex justify-center items-center`}
                    >
                      {chapter.progress === 100 && currentClicked.courseId === course.courseId && currentClicked.chapterId === chapter.chapterId ? (
                        <div className='w-2 h-2 rounded-full bg-blue-500' />
                      ) : chapter.progress === 100 ? (
                        <div className='w-2 h-2 rounded-full bg-yellow-400' />
                      ) : currentClicked.courseId === course.courseId && currentClicked.chapterId === chapter.chapterId ? (
                        <div className='w-2 h-2 rounded-full bg-blue-500' />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className='flex justify-center items-center w-[94%]'>{chapter.title}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='w-[] h-full bg-gray-300' />
    </div>
  );
}
