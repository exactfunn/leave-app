export const metadata = {
  title: 'Leave App',
  description: 'Submit and manage leave requests',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, background: '#f5f5f7', color: '#1a1a1a' }}>
        {children}
      </body>
    </html>
  );
}
