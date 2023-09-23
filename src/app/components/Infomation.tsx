type LectureInformationProps = {
  userId: string;
  courseName: string;
};

export default function Information({ userId, courseName }: LectureInformationProps) {
  return (
    <div className='flex box-content w-full h-28 bg-white gap-x-3 items-center pl-6	'>
      <span className='text-lg '>{courseName}</span>
      <span className='text-lg font-semibold'>{userId}</span>
    </div>
  );
}
