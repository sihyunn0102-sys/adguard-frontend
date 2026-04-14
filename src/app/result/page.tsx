"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ResultPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    const fetchMockData = async () => {
      // 2.5초간 AI가 정화하는 연출을 합니다.
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const fakeData = {
        riskLevel: "High",
        spellCheck: {
          original: [
            {
              text: "본 제품은 피부과 시술과 완벽히 동일한 효과를 내며, ",
              isError: false,
            },
            { text: "단 1회 사용만으로", isError: true },
            { text: " 안면 리프팅 ", isError: false },
            { text: "100% 보장", isError: true },
            {
              text: "합니다. 부작용이 전혀 없는 기적의 크림으로, ",
              isError: false,
            },
            { text: "의약품을 완벽히 대체", isError: true },
            { text: "할 수 있습니다.", isError: false },
          ],
          corrected: [
            {
              text: "본 제품은 피부 탄력 관리에 도움을 줄 수 있으며, ",
              isFix: false,
            },
            { text: "꾸준한 사용으로", isFix: true },
            { text: " 피부 탄력 개선에 ", isFix: false },
            { text: "도움을 줍니다.", isFix: true },
            {
              text: " 화장품으로써 피부 보습에 도움을 주는 크림으로, ",
              isFix: false,
            },
            { text: "일상적인 스킨케어용", isFix: true },
            { text: "으로 적합합니다.", isFix: false },
          ],
        },
        suggestions: [
          {
            id: 1,
            text: "꾸준한 사용으로 피부 탄력 개선에 도움을 줄 수 있습니다.",
            tag: "가장 안전 🟢",
          },
          {
            id: 2,
            text: "피부 탄력 케어에 도움을 주는 성분이 함유되어 있습니다.",
            tag: "자연스러움 🟡",
          },
        ],
      };

      setResultData(fakeData);
      setIsLoading(false);
    };

    fetchMockData();
  }, []);

  // 1. 로딩 상태일 때 (Gleb 스타일 AI 스피어)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white font-sans overflow-hidden">
        <div className="relative w-80 h-80 flex items-center justify-center">
          <div className="absolute w-full h-full bg-gradient-to-tr from-blue-400/20 to-purple-400/20 blur-[100px] animate-pulse"></div>
          <div className="relative w-48 h-48 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full blur-[2px] shadow-[0_0_50px_rgba(59,130,246,0.3)] animate-morphing overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-50"></div>
            <div className="absolute top-[-20%] left-[-20%] w-full h-full bg-white/20 blur-2xl rounded-full"></div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-black tracking-[0.3em] text-blue-700/60 uppercase mb-2">
              Analyzing
            </span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center z-10">
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
            AI 광고 청정기 가동 중
          </h2>
          <p className="text-zinc-400 mt-2 font-medium">
            허위 광고 문구를 정화하고 있습니다...
          </p>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes morphing {
            0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(0deg); }
            50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: rotate(180deg); }
            100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(360deg); }
          }
          .animate-morphing { animation: morphing 8s ease-in-out infinite; }
        `,
          }}
        />
      </div>
    );
  }

  // 2. 분석 완료 후 결과 화면
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center py-12 px-6">
      <main className="w-full max-w-5xl bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-zinc-100 p-10 md:p-14">
        {/* 헤더 섹션 */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-blue-600 font-black text-xs tracking-widest uppercase mb-2 block">
              Analysis Report
            </span>
            <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">
              분석 결과 리포트
            </h1>
          </div>
          {resultData.riskLevel === "High" && (
            <div className="bg-red-50 text-red-600 px-6 py-2 rounded-full font-black text-sm border border-red-100">
              🔴 위험 단계
            </div>
          )}
        </div>

        {/* Before/After 비교 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-zinc-50 rounded-[32px] p-8 border border-zinc-100 relative">
            <div className="absolute top-6 right-8 text-[10px] font-black text-red-300 tracking-widest uppercase">
              Before
            </div>
            <h4 className="text-zinc-400 font-bold text-sm mb-6">
              수정 전 위반 문구
            </h4>
            <div className="h-48 overflow-y-auto leading-relaxed text-lg text-zinc-600">
              {resultData.spellCheck.original.map((chunk: any, i: number) => (
                <span
                  key={i}
                  className={
                    chunk.isError
                      ? "bg-red-100 text-red-700 px-1 rounded-md line-through decoration-red-300 decoration-2 mx-0.5"
                      : ""
                  }
                >
                  {chunk.text}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-blue-50/30 rounded-[32px] p-8 border border-blue-100/50 relative">
            <div className="absolute top-6 right-8 text-[10px] font-black text-blue-300 tracking-widest uppercase">
              After
            </div>
            <h4 className="text-blue-600 font-bold text-sm mb-6">
              AI 정화 완료
            </h4>
            <div className="h-48 overflow-y-auto leading-relaxed text-lg text-zinc-800">
              {resultData.spellCheck.corrected.map((chunk: any, i: number) => (
                <span
                  key={i}
                  className={
                    chunk.isFix
                      ? "bg-blue-600 text-white px-1.5 py-0.5 rounded-md font-bold mx-0.5 shadow-sm"
                      : ""
                  }
                >
                  {chunk.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 추천 제안 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {resultData.suggestions.map((item: any) => (
            <div
              key={item.id}
              className="p-6 bg-white border border-zinc-100 rounded-[24px] hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer group"
            >
              <span className="text-[10px] font-black tracking-widest text-zinc-400 group-hover:text-blue-500 transition-colors uppercase">
                {item.tag}
              </span>
              <p className="mt-3 text-zinc-700 font-medium">{item.text}</p>
            </div>
          ))}
        </div>

        {/* 하단 내비게이션 버튼 */}
        <div className="flex gap-4">
          <Link
            href="/upload"
            className="flex-1 h-16 bg-zinc-900 text-white rounded-2xl flex items-center justify-center font-bold hover:bg-zinc-800 transition-all text-lg shadow-lg"
          >
            새 이미지 검사
          </Link>
          <Link
            href="/"
            className="px-10 h-16 border-2 border-zinc-100 text-zinc-400 rounded-2xl flex items-center justify-center font-bold hover:bg-zinc-50 transition-all text-lg"
          >
            홈
          </Link>
        </div>
      </main>
    </div>
  );
}
