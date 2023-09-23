import { ReactNode } from 'react';

interface MyActivityLayoutProps {
  children: ReactNode;
}

function MyActivityLayout({ children }: MyActivityLayoutProps) {
  return (
    <section className='flex flex-col justify-start items-start w-full h-full'>
      <header className='w-full h-20 bg-green-500'>header</header>
      <div className='p-5 w-full h-full'>{children}</div>
    </section>
  );
}

export default MyActivityLayout;
