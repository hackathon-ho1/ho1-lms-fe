export default function LectureLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex flex-col justify-start items-start w-full h-full'>
      <div className='w-full h-full'>{children}</div>
    </section>
  );
}
