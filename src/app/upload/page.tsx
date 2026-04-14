import Link from "next/link";

export default function UploadPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 p-8 text-center font-sans">
      <main className="flex flex-col items-center gap-6 bg-white p-12 rounded-3xl shadow-xl border border-zinc-200 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-zinc-900">
          🛡️ 광고 분석 업로드
        </h1>
        <p className="text-zinc-600">
          분석할 광고 문구링 이미지 파일을 업로드해 주세요.
        </p>

        {/* 임시 업로드 영역 느낌 */}
        <div className="w-full h-40 border-2 border-dashed border-zinc-200 rounded-2xl flex items-center justify-center text-zinc-400">
          여기에 파일을 드래그하거나 클릭하세요
        </div>

        <Link href="/" className="text-blue-600 hover:underline font-medium">
          ← 메인으로 돌아가기
        </Link>
      </main>
    </div>
  );
}
