"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ResultPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    const fetchMockData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const fakeData = {
        riskLevel: "High",
        // 💡 긴 글 테스트를 위해 데이터 길이를 대폭 늘렸습니다!
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
            {
              text: "할 수 있습니다. 매일 밤 바르고 주무시면 ",
              isError: false,
            },
            { text: "10년 전 피부로 완벽하게 되돌려 드립니다.", isError: true },
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
            {
              text: "으로 적합합니다. 매일 밤 꾸준히 사용하시면 ",
              isFix: false,
            },
            {
              text: "건강하고 생기 있는 피부 유지에 도움을 줄 수 있습니다.",
              isFix: true,
            },
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 p-8 font-sans">
      <main className="flex flex-col gap-8 bg-white p-10 rounded-3xl shadow-xl border border-zinc-200 max-w-4xl w-full">
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

        {/* 🚀 스크롤이 적용된 좌우 분할 비교 화면 (긴 글 최적화) */}
        <div className="flex flex-col gap-4 p-6 bg-zinc-50 rounded-2xl border border-zinc-200 shadow-inner">
          <h3 className="font-bold text-zinc-800 flex items-center gap-2">
            📝 문구 교정 전/후 비교
            <span className="text-xs font-normal text-zinc-500 bg-white px-2 py-1 rounded border border-zinc-200 ml-2">
              긴 글은 스크롤하여 확인하세요
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 왼쪽: 수정 전 (빨간펜) */}
            <div className="flex flex-col bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden">
              <div className="bg-red-50/50 p-3 border-b border-red-100 flex justify-between items-center">
                <span className="text-sm font-bold text-red-600">
                  수정 전 (위반 소지)
                </span>
                <span className="text-red-400 text-xs">🔴</span>
              </div>
              {/* h-[200px] 와 overflow-y-auto 로 고정 높이 + 스크롤 생성! */}
              <div className="p-4 h-[200px] overflow-y-auto leading-loose">
                <p className="text-[15px] text-zinc-700 font-medium">
                  {resultData.spellCheck.original.map(
                    (chunk: any, index: number) => (
                      <span
                        key={index}
                        className={
                          chunk.isError
                            ? "bg-red-100 text-red-700 px-1 rounded border border-red-200 line-through decoration-red-400 decoration-2 font-bold mx-0.5"
                            : ""
                        }
                      >
                        {chunk.text}
                      </span>
                    ),
                  )}
                </p>
              </div>
            </div>

            {/* 오른쪽: 수정 후 (초록펜) */}
            <div className="flex flex-col bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
              <div className="bg-green-50/50 p-3 border-b border-green-100 flex justify-between items-center">
                <span className="text-sm font-bold text-green-700">
                  수정 후 (안전함)
                </span>
                <span className="text-green-500 text-xs">🟢</span>
              </div>
              <div className="p-4 h-[200px] overflow-y-auto leading-loose">
                <p className="text-[15px] text-zinc-700 font-medium">
                  {resultData.spellCheck.corrected.map(
                    (chunk: any, index: number) => (
                      <span
                        key={index}
                        className={
                          chunk.isFix
                            ? "bg-green-100 text-green-800 px-1 rounded border border-green-300 font-bold mx-0.5"
                            : ""
                        }
                      >
                        {chunk.text}
                      </span>
                    ),
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI 수정안 제안 카드 */}
        <div className="space-y-4">
          <h3 className="font-bold text-zinc-800 flex items-center gap-2">
            ✨ 추가 제안 및 요약{" "}
            <span className="text-sm font-normal text-zinc-500">
              (클릭하여 복사)
            </span>
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {resultData.suggestions.map((item: any) => (
              <div
                key={item.id}
                className="group relative p-5 border border-blue-100 bg-white rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md hover:bg-blue-50/30 transition-all cursor-pointer overflow-hidden"
              >
                <span className="absolute top-0 right-0 bg-zinc-100 text-zinc-600 text-xs font-bold px-3 py-1.5 rounded-bl-xl group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                  {item.tag}
                </span>
                <p className="text-zinc-800 font-medium mt-3 leading-relaxed">
                  {item.text}
                </p>
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
