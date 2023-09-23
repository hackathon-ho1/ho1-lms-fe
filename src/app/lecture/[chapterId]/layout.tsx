import { ReactNode } from 'react';

interface LectureDetailLayoutProps {
  children: ReactNode;
}

export default function LectureDetailLayout({ children }: LectureDetailLayoutProps) {
  return <section className='w-full h-full flex flex-row justify-start items-start'>{children}</section>;
}
