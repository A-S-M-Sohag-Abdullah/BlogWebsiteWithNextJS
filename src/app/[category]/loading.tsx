// app/loading.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="h-8 w-8 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
