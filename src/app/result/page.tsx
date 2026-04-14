import Link from "next/link";

export default function ResultPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 p-8 font-sans">
      <main className="flex flex-col gap-6 bg-white p-10 rounded-3xl shadow-xl border border-zinc-200 max-w-2xl w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-zinc-900">🔍 분석 결과</h1>
          <span className="px-4 py-1 bg-red-100 text-red-600 rounded-full font-bold text-sm">
            위험 (🔴 High)
          </span>
        </div>

        <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
          <h3 className="font-bold text-zinc-700 mb-2">탐지된 위반 문구</h3>
          <p className="text-lg text-red-500 font-medium">
            "단 1회 사용만으로 안면 리프팅 100% 보장"
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-zinc-700">AI 교정 제안</h3>
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-700">
            "꾸준한 사용으로 피부 탄력 개선에 도움을 줄 수 있습니다"
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Link
            href="/upload"
            className="flex-1 h-12 flex items-center justify-center bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-colors"
          >
            다시 검사하기
          </Link>
          <Link
            href="/"
            className="flex-1 h-12 flex items-center justify-center border border-zinc-200 rounded-xl font-bold text-zinc-600 hover:bg-zinc-50"
          >
            홈으로
          </Link>
        </div>
      </main>
    </div>
  );
}
