type LectureInformationProps = {
  userId: string;
  courseName: string;
};

export default function Information({ userId, courseName }: LectureInformationProps) {
  return (
    <div>
      <span>{userId}</span>
      <span>{courseName}</span>
    </div>
  );
}
