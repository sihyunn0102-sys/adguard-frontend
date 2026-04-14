"use client";

import { useState } from "react";

const categories = [
  {
    id: "general",
    label: "일반화장품",
    desc: "스킨케어 · 메이크업 · 헤어",
    icon: "🧴",
    color: "hover:border-pink-200 hover:bg-pink-50",
    activeColor: "border-pink-400 bg-pink-50",
  },
  {
    id: "functional",
    label: "기능성화장품",
    desc: "미백 · 주름 · 자외선차단",
    icon: "✨",
    color: "hover:border-purple-200 hover:bg-purple-50",
    activeColor: "border-purple-400 bg-purple-50",
  },
  {
    id: "quasi",
    label: "의약외품",
    desc: "치약 · 구강청결제 · 파스",
    icon: "💊",
    color: "hover:border-blue-200 hover:bg-blue-50",
    activeColor: "border-blue-400 bg-blue-50",
  },
];

export default function UploadPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleAnalyze = () => {
    setLoading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 4;
      });
    }, 400);
  };

  const isReady = selectedCategory && (text || file);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs text-gray-400 mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Azure AI 기반 광고 컴플라이언스 도구
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🧹 광고청정기
          </h1>
          <p className="text-gray-400 text-base">
            광고 문구를 입력하거나 파일을 업로드하면 위반 여부를 분석해드려요.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="grid grid-cols-2 gap-8">
            {/* 왼쪽 */}
            <div className="space-y-6">
              {/* 카테고리 */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  제품 유형 선택 <span className="text-red-400">*</span>
                </p>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-150 flex items-center gap-4 ${
                        selectedCategory === cat.id
                          ? cat.activeColor
                          : `border-gray-100 ${cat.color}`
                      }`}
                    >
                      <div className="text-2xl">{cat.icon}</div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">
                          {cat.label}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {cat.desc}
                        </div>
                      </div>
                      {selectedCategory === cat.id && (
                        <div className="ml-auto text-xs font-medium text-gray-500">
                          선택됨 ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 텍스트 입력 */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  텍스트 입력
                </p>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={
                    "광고 문구를 입력하세요\n예) 단 1회만에 피부 30% 개선 보장!"
                  }
                  className="w-full h-32 p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder-gray-300 resize-none focus:outline-none focus:border-gray-400 transition-colors"
                />
                {text && (
                  <p className="text-xs text-gray-300 mt-1 text-right">
                    {text.length}자
                  </p>
                )}
              </div>
            </div>

            {/* 오른쪽 */}
            <div className="space-y-6 flex flex-col">
              {/* 파일 업로드 */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  파일 업로드
                </p>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`h-52 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-150 ${
                    isDragging
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {file ? (
                    <div className="text-center space-y-2">
                      <div className="text-3xl">📄</div>
                      <p className="text-sm text-gray-600 font-medium max-w-[180px] truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-300">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        onClick={() => setFile(null)}
                        className="text-xs text-red-400 underline"
                      >
                        삭제
                      </button>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <div className="text-4xl text-gray-200">↑</div>
                      <p className="text-sm text-gray-400">
                        이미지 · PDF를 드래그하거나
                      </p>
                      <label className="cursor-pointer px-4 py-2 rounded-lg bg-gray-100 text-xs text-gray-500 hover:bg-gray-200 transition-colors inline-block">
                        파일 선택
                        <input
                          type="file"
                          className="hidden"
                          accept=".png,.jpg,.jpeg,.pdf"
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                      </label>
                      <p className="text-xs text-gray-300">
                        PNG · JPG · PDF · 최대 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* 진행 상태바 */}
              {loading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>🔍 광고 문구 분석 중...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-black h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-300">
                    {progress < 30
                      ? "법령 데이터베이스 검색 중..."
                      : progress < 60
                        ? "위반 표현 탐지 중..."
                        : progress < 90
                          ? "수정안 생성 중..."
                          : "거의 완료됐어요!"}
                  </p>
                </div>
              )}

              {/* 구분선 */}
              <div className="border-t border-gray-100 pt-4 mt-auto space-y-3">
                {!selectedCategory && (text || file) && (
                  <p className="text-xs text-red-400 text-center">
                    제품 유형을 먼저 선택해주세요
                  </p>
                )}
                <button
                  onClick={handleAnalyze}
                  disabled={!isReady || loading}
                  className={`w-full py-4 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isReady && !loading
                      ? "bg-black text-white hover:bg-gray-800 shadow-sm"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {loading ? "분석 중..." : "광고 분석 시작 →"}
                </button>
                <p className="text-xs text-gray-300 text-center">
                  분석 결과는 법적 효력이 없으며 참고용으로만 활용하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
