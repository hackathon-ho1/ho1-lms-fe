import { ReactNode } from 'react';
import Information from 'app/components/Infomation';

interface MyActivityLayoutProps {
  children: ReactNode;
}

function MyActivityLayout({ children }: MyActivityLayoutProps) {
  return (
    <section className='flex flex-col justify-start items-start w-full h-full'>
      <Information />
      <div className='p-5 w-full h-full'>{children}</div>
    </section>
  );
}

export default MyActivityLayout;
