import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/components/AuthProvider';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'Auralis Hotel & Resort — Where Luxury Meets You',
  description: 'Experience unparalleled luxury at Auralis Hotel & Resort. World-class amenities, exquisite dining, and breathtaking views await.',
  keywords: 'luxury hotel, resort, Auralis, premium accommodation, fine dining',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#122B4F',
                color: '#F8F9FB',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '10px',
                fontSize: '0.9rem',
              },
              success: { iconTheme: { primary: '#D4AF37', secondary: '#0B1E3A' } },
              error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
