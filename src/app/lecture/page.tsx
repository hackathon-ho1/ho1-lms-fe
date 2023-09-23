import Information from 'app/components/Infomation';
import { Informain } from '../../../lectureSample.json';
import LectureCard from 'app/components/LectureCard';

export type Course = {
  courseId: number;
  title: string;
  description: string;
  progress: number;
};

// 컴포넌트 함수의 타입 지정은 따로 안하나요?
// key,value 값이 같으면 생략해서 쓸 수 있지 않나..?
export default function LecturePage() {
  const { userId, courseName } = Informain[0];
  return (
    <div>
      <Information userId={userId} courseName={courseName} />
      <LectureCard />
    </div>
  );
}
