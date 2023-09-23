import SiderBar from './components/Sidebar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body>
        <section className='flex flex-row justify-start items-start'>
          <SiderBar />
          {children}
        </section>
      </body>
    </html>
  );
}
