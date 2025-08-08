import ParallaxBlobs from './ParallaxBlobs';

export default function ThemedFormWrapper({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ background: '#000' }}>
      <ParallaxBlobs />
      <main className="flex flex-col items-center justify-center min-h-screen w-full z-10">
        <h2 className="text-4xl font-extrabold mb-8 tracking-widest" style={{ color: '#7b2233', fontFamily: 'monospace', letterSpacing: 6 }}>{title}</h2>
        <div className="w-full max-w-lg bg-black bg-opacity-80 rounded-2xl shadow-2xl p-8 border-2 border-[#7b2233]">
          {children}
        </div>
      </main>
    </div>
  );
}
