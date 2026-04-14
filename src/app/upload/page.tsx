"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "cosmetic",
    label: "화장품",
    desc: "스킨케어·메이크업·헤어",
    icon: "🧴",
  },
  { id: "quasi", label: "의약외품", desc: "치약·구강청결제·파스", icon: "💊" },
  {
    id: "health",
    label: "건강기능식품",
    desc: "영양제·다이어트 보조제",
    icon: "🌿",
  },
  {
    id: "sns",
    label: "SNS 광고",
    desc: "인스타·유튜브 협찬 게시물",
    icon: "📱",
  },
];

export default function UploadPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

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
        return prev + 5;
      });
    }, 500);
  };

  const isReady = selectedCategory && (text || file);

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-8">
      {/* 타이틀 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">광고청정기</h1>
        <p className="text-gray-500 text-sm mt-1">
          광고 문구를 입력하거나 이미지·PDF를 업로드하면 위반 여부를
          분석해드려요.
        </p>
      </div>

      {/* 카테고리 선택 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          제품 유형 선택 <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedCategory === cat.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="font-medium text-sm text-gray-800">
                {cat.label}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{cat.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 텍스트 입력 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">텍스트 입력</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="광고 문구를 입력하세요. 예) 단 1회만에 피부 30% 개선 보장!"
          className="w-full h-32 p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 파일 드래그앤드롭 */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        {file ? (
          <div className="space-y-1">
            <p className="text-sm text-gray-700">
              선택된 파일: <span className="font-medium">{file.name}</span>
            </p>
            <button
              onClick={() => setFile(null)}
              className="text-xs text-red-400 underline"
            >
              삭제
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500">
              이미지·PDF를 여기에 드래그하거나
            </p>
            <label className="mt-2 inline-block cursor-pointer text-blue-500 text-sm underline">
              파일 선택
              <input
                type="file"
                className="hidden"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
            <p className="text-xs text-gray-400 mt-1">
              PNG · JPG · PDF (최대 5MB)
            </p>
          </>
        )}
      </div>

      {/* 진행 상태바 */}
      {loading && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>분석 중...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* 분석 버튼 */}
      <Button
        onClick={handleAnalyze}
        disabled={!isReady || loading}
        className="w-full h-12 text-base"
      >
        {loading ? "분석 중..." : "광고 분석 시작"}
      </Button>

      {/* 카테고리 미선택 안내 */}
      {!selectedCategory && (text || file) && (
        <p className="text-xs text-red-400 text-center">
          제품 유형을 먼저 선택해주세요
        </p>
      )}
    </main>
  );
}
