'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { UserNote, ReadingProgressItem } from './types';

// 用户数据结构
interface UserData {
  favorites: string[];
  notes: UserNote[];
  readingProgress: Record<string, ReadingProgressItem>;
  completedExperiments: string[];
  lastVisitAt: string;
  visitCount: number;
}

interface UserContextType {
  favorites: string[];
  notes: UserNote[];
  readingProgress: Record<string, ReadingProgressItem>;
  completedExperiments: string[];
  experiments: string[]; // 别名，与 completedExperiments 相同
  toggleFavorite: (articleId: string) => void;
  addNote: (articleId: string, content: string) => void;
  updateProgress: (articleId: string, progress: number) => void;
  updateReadingProgress: (articleId: string, progress: number) => void; // 别名
  toggleExperiment: (experimentId: string) => void;
  isExperimentCompleted: (experimentId: string) => boolean;
}

const defaultUserData: UserData = {
  favorites: [],
  notes: [],
  readingProgress: {},
  completedExperiments: [],
  lastVisitAt: new Date().toISOString(),
  visitCount: 0
};

const UserContext = createContext<UserContextType | null>(null);

const STORAGE_KEY = 'ros1-knowledge-user-data';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [mounted, setMounted] = useState(false);

  // 加载本地存储数据
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUserData({
          ...defaultUserData,
          ...parsed,
          lastVisitAt: new Date().toISOString(),
          visitCount: (parsed.visitCount || 0) + 1
        });
      } else {
        setUserData(prev => ({
          ...prev,
          visitCount: 1
        }));
      }
    } catch {
      // 数据损坏时重置
      setUserData(defaultUserData);
    }
    setMounted(true);
  }, []);

  // 保存到本地存储
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      } catch {
        // 存储失败时忽略
      }
    }
  }, [userData, mounted]);

  const toggleFavorite = useCallback((articleId: string) => {
    setUserData(prev => ({
      ...prev,
      favorites: prev.favorites.includes(articleId)
        ? prev.favorites.filter(id => id !== articleId)
        : [...prev.favorites, articleId]
    }));
  }, []);

  const addNote = useCallback((articleId: string, content: string) => {
    setUserData(prev => {
      const existingIndex = prev.notes.findIndex(n => n.articleId === articleId);
      const now = new Date().toISOString();
      
      let newNotes: UserNote[];
      if (existingIndex >= 0) {
        newNotes = [...prev.notes];
        newNotes[existingIndex] = {
          ...newNotes[existingIndex],
          content,
          updatedAt: now
        };
      } else {
        newNotes = [...prev.notes, {
          id: `note-${Date.now()}`,
          articleId,
          content,
          createdAt: now,
          updatedAt: now
        }];
      }
      
      return { ...prev, notes: newNotes };
    });
  }, []);

  const updateProgress = useCallback((articleId: string, progress: number) => {
    setUserData(prev => {
      const existing = prev.readingProgress[articleId];
      const now = new Date().toISOString();
      
      const newItem: ReadingProgressItem = {
        read: true,
        lastReadAt: now,
        progress: Math.min(100, Math.max(0, progress)),
        completed: progress >= 95,
        startedAt: existing?.startedAt || now
      };
      
      return {
        ...prev,
        readingProgress: {
          ...prev.readingProgress,
          [articleId]: newItem
        }
      };
    });
  }, []);

  const toggleExperiment = useCallback((experimentId: string) => {
    setUserData(prev => ({
      ...prev,
      completedExperiments: prev.completedExperiments.includes(experimentId)
        ? prev.completedExperiments.filter(id => id !== experimentId)
        : [...prev.completedExperiments, experimentId]
    }));
  }, []);

  const isExperimentCompleted = useCallback((experimentId: string) => {
    return userData.completedExperiments.includes(experimentId);
  }, [userData.completedExperiments]);

  const value: UserContextType = {
    favorites: userData.favorites,
    notes: userData.notes,
    readingProgress: userData.readingProgress,
    completedExperiments: userData.completedExperiments,
    experiments: userData.completedExperiments, // 别名
    toggleFavorite,
    addNote,
    updateProgress,
    updateReadingProgress: updateProgress, // 别名
    toggleExperiment,
    isExperimentCompleted
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}