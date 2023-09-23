import SiderBar from './components';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body>
        <SiderBar />
        {children}
      </body>
    </html>
  );
}
