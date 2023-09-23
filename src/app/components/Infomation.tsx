export type Information = {
  userId: string;
  courseName: string;
};

export default function Information({ userId, courseName }: Information) {
  return (
    <div>
      <span>{userId}</span>
      <span>{courseName}</span>
    </div>
  );
}
