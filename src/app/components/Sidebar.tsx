'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type SideBarButtonType = {
  name: string;
  route: string;
};

export default function SiderBar() {
  const router = useRouter();

  const sideBarButtons: SideBarButtonType[] = [
    { name: '홈', route: '/' },
    { name: '내 활동', route: '/my-activity' },
    { name: '내 강의', route: '/lecture' },
  ];

  return (
    <div className='w-[120px] h-[100vh] bg-[#bbb2f1] flex items-start justify-center'>
      <ul
        className='w-full h-2/5 flex flex-col justify-center items-center
      font-semibold text-lg gap-16 text-center min-h-[350px]
      '
      >
        {sideBarButtons.map((item) => (
          <li
            className='w-20 py-2 rounded-md hover:opacity-60 hover:bg-white hover:bg-opacity-30 transition
        cursor-pointer
        '
            onClick={() => router.push(item.route)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
