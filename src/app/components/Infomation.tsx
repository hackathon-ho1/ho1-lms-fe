type LectureInformationProps = {
  userId: string;
  courseName: string;
};

export default function Information({ userId, courseName }: LectureInformationProps) {
  return (
    <div className='w-full h-20 bg-green-500'>
      <span>{userId}</span>
      <span>{courseName}</span>
    </div>
  );
}
