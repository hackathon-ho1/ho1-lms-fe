import { User } from '../../../lectureSample.json';
import Information from 'app/components/Infomation';

export default function LectureLayout({ children }: { children: React.ReactNode }) {
  const { userId, courseName } = User[0];
  return (
    <div className='flex flex-col w-full h-full'>
      <Information userId={userId} courseName={courseName} />
      <main>{children}</main>
    </div>
  );
}
