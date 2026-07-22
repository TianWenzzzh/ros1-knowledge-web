'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface QuizItem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface InlineQuizProps {
  quiz: QuizItem;
  onComplete?: (correct: boolean) => void;
}

export function InlineQuiz({ quiz, onComplete }: InlineQuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    const correct = selected === quiz.correctAnswer;
    setIsCorrect(correct);
    setSubmitted(true);
    onComplete?.(correct);
  };

  const handleReset = () => {
    setSelected(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="my-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="outline" className="text-xs">
          自测题
        </Badge>
        {submitted && (
          <Badge variant={isCorrect ? 'default' : 'destructive'} className="text-xs">
            {isCorrect ? '✓ 正确' : '✗ 错误'}
          </Badge>
        )}
      </div>
      
      <p className="font-medium text-slate-900 mb-3">{quiz.question}</p>
      
      <div className="space-y-2 mb-4">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !submitted && setSelected(index)}
            disabled={submitted}
            className={cn(
              'w-full text-left px-4 py-2 rounded-lg border transition-colors',
              submitted
                ? index === quiz.correctAnswer
                  ? 'bg-green-50 border-green-300 text-green-900'
                  : index === selected
                  ? 'bg-red-50 border-red-300 text-red-900'
                  : 'bg-white border-slate-200 text-slate-600'
                : selected === index
                ? 'bg-cyan-50 border-cyan-300 text-cyan-900'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            )}
          >
            <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
            {option}
            {submitted && index === quiz.correctAnswer && (
              <span className="ml-2 text-green-600">✓</span>
            )}
          </button>
        ))}
      </div>

      {submitted && (
        <div className="p-3 bg-white rounded-lg border border-slate-200 mb-4">
          <p className="text-sm text-slate-700">
            <strong>解析：</strong>{quiz.explanation}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={selected === null}
            size="sm"
          >
            提交答案
          </Button>
        ) : (
          <Button onClick={handleReset} variant="outline" size="sm">
            重新作答
          </Button>
        )}
      </div>
    </div>
  );
}

// 错题本类型和存储
export interface WrongAnswerRecord {
  quizId: string;
  articleId: string;
  question: string;
  selectedOption: number;
  correctAnswer: number;
  timestamp: string;
}

const WRONG_ANSWERS_KEY = 'ros1-wrong-answers';

export function useWrongAnswers() {
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswerRecord[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(WRONG_ANSWERS_KEY);
      if (stored) {
        setWrongAnswers(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const addWrongAnswer = useCallback((record: Omit<WrongAnswerRecord, 'timestamp'>) => {
    if (typeof window === 'undefined') return;
    try {
      const newRecord: WrongAnswerRecord = {
        ...record,
        timestamp: new Date().toISOString(),
      };
      const updated = [newRecord, ...wrongAnswers.filter(w => w.quizId !== record.quizId)].slice(0, 50);
      setWrongAnswers(updated);
      localStorage.setItem(WRONG_ANSWERS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }, [wrongAnswers]);

  const removeWrongAnswer = useCallback((quizId: string) => {
    if (typeof window === 'undefined') return;
    try {
      const updated = wrongAnswers.filter(w => w.quizId !== quizId);
      setWrongAnswers(updated);
      localStorage.setItem(WRONG_ANSWERS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }, [wrongAnswers]);

  const clearWrongAnswers = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      setWrongAnswers([]);
      localStorage.removeItem(WRONG_ANSWERS_KEY);
    } catch {
      // ignore
    }
  }, []);

  return {
    wrongAnswers,
    addWrongAnswer,
    removeWrongAnswer,
    clearWrongAnswers,
  };
}

// 错题本页面组件
interface WrongAnswersListProps {
  wrongAnswers: WrongAnswerRecord[];
  onRemove: (quizId: string) => void;
  onClear: () => void;
}

export function WrongAnswersList({ wrongAnswers, onRemove, onClear }: WrongAnswersListProps) {
  if (wrongAnswers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🎉</div>
        <p className="text-slate-600">没有错题记录</p>
        <p className="text-sm text-slate-500 mt-1">继续保持！</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          共 {wrongAnswers.length} 道错题
        </p>
        <Button onClick={onClear} variant="outline" size="sm">
          清空错题本
        </Button>
      </div>
      
      {wrongAnswers.map((record, index) => (
        <div key={record.quizId} className="p-4 bg-white rounded-lg border border-slate-200">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="font-medium text-slate-900 mb-2">{record.question}</p>
              <p className="text-sm text-red-600">
                你的答案：{String.fromCharCode(65 + record.selectedOption)}
              </p>
              <p className="text-sm text-green-600">
                正确答案：{String.fromCharCode(65 + record.correctAnswer)}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                {new Date(record.timestamp).toLocaleDateString()}
              </p>
            </div>
            <Button
              onClick={() => onRemove(record.quizId)}
              variant="ghost"
              size="sm"
            >
              ✓ 已掌握
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}