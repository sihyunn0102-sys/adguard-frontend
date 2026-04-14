"use client"; // Next.js에서 상태 관리(useState, useEffect)를 하려면 최상단에 꼭 적어줘야 합니다!

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ResultPage() {
  // 1. 상태 관리: 로딩 상태와 결과 데이터를 저장할 공간
  const [isLoading, setIsLoading] = useState(true);
  const [resultData, setResultData] = useState<any>(null);

  // 2. 가짜 API 호출 (Mocking)
  useEffect(() => {
    const fetchMockData = async () => {
      // 진짜 서버와 통신하는 것처럼 1.5초(1500ms) 동안 로딩 시간을 줍니다.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ----------------------------------------------------------------------
      // 🚨 TODO(시현님): 목요일에 백엔드 API 연결하실 때, 이 아래의 'fakeData' 부분을 지우고
      // 실제 fetch() 코드로 교체해 주세요!
      // 예시:
      // const res = await fetch("http://api.주소/rewrite", { method: "POST", ... });
      // const realData = await res.json();
      // setResultData(realData);
      // ----------------------------------------------------------------------

      const fakeData = {
        originalText: "단 1회 사용만으로 안면 리프팅 100% 보장",
        riskLevel: "High",
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
          {
            id: 3,
            text: "일시적인 피부 리프팅 효과를 경험해 보세요.",
            tag: "마케팅 강조 🔵",
          },
        ],
      };

      setResultData(fakeData);
      setIsLoading(false); // 데이터 도착! 로딩 끝!
    };

    fetchMockData();
  }, []);

  // 3. 로딩 중일 때 보여줄 화면 (빙글빙글 도는 스피너)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mb-6 border-t-transparent"></div>
        <p className="text-lg text-zinc-600 font-bold animate-pulse">
          AI가 화장품 광고 위반 여부를 분석하고 있습니다... 🔍
        </p>
      </div>
    );
  }

  // 4. 로딩이 끝나고 데이터가 도착했을 때 보여줄 진짜 결과 화면
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 p-8 font-sans">
      <main className="flex flex-col gap-8 bg-white p-10 rounded-3xl shadow-xl border border-zinc-200 max-w-2xl w-full">
        {/* 상단 헤더 & 신호등 뱃지 */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-zinc-900">
            🔍 분석 결과
          </h1>
          {resultData.riskLevel === "High" && (
            <span className="px-4 py-1.5 bg-red-100 text-red-600 rounded-full font-bold text-sm shadow-sm">
              위험 (🔴 High)
            </span>
          )}
        </div>

        {/* 원본 위반 문구 */}
        <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100">
          <h3 className="font-bold text-red-800 mb-2">탐지된 위반 문구</h3>
          <p className="text-lg text-red-600 font-medium">
            "{resultData.originalText}"
          </p>
        </div>

        {/* 수정안 3개 카드 컴포넌트 영역 */}
        <div className="space-y-4">
          <h3 className="font-bold text-zinc-800 flex items-center gap-2">
            ✨ AI 교정 제안{" "}
            <span className="text-sm font-normal text-zinc-500">
              (클릭하여 복사)
            </span>
          </h3>

          <div className="grid gap-3 sm:grid-cols-1">
            {resultData.suggestions.map((item: any) => (
              <div
                key={item.id}
                className="group relative p-5 border border-blue-100 bg-white rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md hover:bg-blue-50/30 transition-all cursor-pointer overflow-hidden"
              >
                <span className="absolute top-0 right-0 bg-zinc-100 text-zinc-600 text-xs font-bold px-3 py-1.5 rounded-bl-xl group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                  {item.tag}
                </span>
                <p className="text-zinc-800 font-medium mt-3 pr-16 leading-relaxed">
                  {item.text}
                </p>
                <div className="mt-4 text-sm text-blue-600 font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  이 문구 사용하기 📋
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-4 mt-4">
          <Link
            href="/upload"
            className="flex-1 h-14 flex items-center justify-center bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-colors"
          >
            다시 검사하기
          </Link>
          <Link
            href="/"
            className="flex-1 h-14 flex items-center justify-center border-2 border-zinc-200 rounded-xl font-bold text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
          >
            홈으로
          </Link>
        </div>
      </main>
    </div>
  );
}
