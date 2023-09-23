import { ReactNode } from 'react';

interface MyActivityLayoutProps {
  children: ReactNode;
}

function MyActivityLayout({ children }: MyActivityLayoutProps) {
  return <div>{children}</div>;
}

export default MyActivityLayout;
