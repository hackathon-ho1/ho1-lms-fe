'use client';

import { submitPractice } from 'app/lib/api';
import { useRouter } from 'next/navigation';

export default function PracticePage() {
  const router = useRouter();

  const submit = () => {
    const lectureId = window.location.href.split('/')[5];
    submitPractice(Number(lectureId)).then((res) => {
      if (res.statusCode === 200) {
        alert('제출되었습니다.');
        router.push('/my-activity');
      } else {
        alert('제출에 실패했습니다.');
      }
    });
  };

  return (
    <>
      <div className='w-full h-full flex flex-row justify-center items-center gap-5 p-2'>
        <div className='w-1/2 h-full flex justify-center items-center'>
          <div className='w-full h-5/6 rounded bg-white'>
            <div
              className='w-full h-10 rounded-t bg-[#dee2e7]
           font-bold flex  justify-start items-center pl-3
          '
            >
              문제
            </div>
          </div>
        </div>
        <div className='w-1/2 h-full'>
          <div className='w-full h-full flex justify-center items-center flex-col gap-8'>
            <div className='w-full h-3/5 rounded bg-white'>
              <div
                className='w-full h-10 rounded-t bg-[#dee2e7]
              font-bold flex  justify-start items-center pl-3
            '
              >
                입력
              </div>
            </div>
            <div className='w-full h-1/5 rounded bg-white'>
              <div
                className='w-full h-10 rounded-t bg-[#dee2e7]
             font-bold flex  justify-start items-center pl-3
            '
              >
                {' '}
                출력
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-20 flex justify-end items-center'>
        <button className='w-24 h-10 bg-white mr-10 rounded font-bold' onClick={submit}>
          제출하기
        </button>
      </div>
    </>
  );
}
