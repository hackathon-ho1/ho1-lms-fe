import { Course } from 'app/lecture/page';
import { LectureList } from '../../../lectureSample.json';

export default function LectureCard() {
  const list = LectureList;

  return (
    <div>
      <ul className='grid gap-4 grid-cols-4'>
        {list.map((item) => (
          <li className='border-2 border-stone-300' key={item.courseId}>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <div className='paading'>
              <p className=''>{item.progress}</p>
              <p className=''>{item.progress}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
