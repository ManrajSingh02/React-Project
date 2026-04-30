export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-900 to-black">
      {children}
    </div>
  );
}