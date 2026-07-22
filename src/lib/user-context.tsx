'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { UserData, UserNote, ReadingProgress, ExperimentProgress } from './types';

interface UserContextType {
  userData: UserData;
  addFavorite: (articleId: string) => void;
  removeFavorite: (articleId: string) => void;
  isFavorite: (articleId: string) => boolean;
  addNote: (articleId: string, content: string) => void;
  updateNote: (noteId: string, content: string) => void;
  deleteNote: (noteId: string) => void;
  getNotesForArticle: (articleId: string) => UserNote[];
  updateReadingProgress: (articleId: string, progress: number) => void;
  getReadingProgress: (articleId: string) => ReadingProgress | undefined;
  completeExperiment: (experimentId: string) => void;
  uncompleteExperiment: (experimentId: string) => void;
  isExperimentCompleted: (experimentId: string) => boolean;
  getStats: () => { favoritesCount: number; notesCount: number; articlesRead: number; experimentsCompleted: number };
}

const defaultUserData: UserData = {
  favorites: [],
  notes: [],
  readingProgress: [],
  experimentProgress: [],
  quizResults: [],
  lastVisitAt: new Date().toISOString(),
  visitCount: 0
};

const UserContext = createContext<UserContextType | null>(null);

const STORAGE_KEY = 'ros1-knowledge-user-data';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [isLoaded, setIsLoaded] = useState(false);

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
      setUserData(defaultUserData);
    }
    setIsLoaded(true);
  }, []);

  // 保存到本地存储
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    }
  }, [userData, isLoaded]);

  const addFavorite = useCallback((articleId: string) => {
    setUserData(prev => ({
      ...prev,
      favorites: [...new Set([...prev.favorites, articleId])]
    }));
  }, []);

  const removeFavorite = useCallback((articleId: string) => {
    setUserData(prev => ({
      ...prev,
      favorites: prev.favorites.filter(id => id !== articleId)
    }));
  }, []);

  const isFavorite = useCallback((articleId: string) => {
    return userData.favorites.includes(articleId);
  }, [userData.favorites]);

  const addNote = useCallback((articleId: string, content: string) => {
    const newNote: UserNote = {
      id: `note-${Date.now()}`,
      articleId,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setUserData(prev => ({
      ...prev,
      notes: [...prev.notes, newNote]
    }));
  }, []);

  const updateNote = useCallback((noteId: string, content: string) => {
    setUserData(prev => ({
      ...prev,
      notes: prev.notes.map(note =>
        note.id === noteId
          ? { ...note, content, updatedAt: new Date().toISOString() }
          : note
      )
    }));
  }, []);

  const deleteNote = useCallback((noteId: string) => {
    setUserData(prev => ({
      ...prev,
      notes: prev.notes.filter(note => note.id !== noteId)
    }));
  }, []);

  const getNotesForArticle = useCallback((articleId: string) => {
    return userData.notes.filter(note => note.articleId === articleId);
  }, [userData.notes]);

  const updateReadingProgress = useCallback((articleId: string, progress: number) => {
    setUserData(prev => {
      const existing = prev.readingProgress.find(r => r.articleId === articleId);
      if (existing) {
        return {
          ...prev,
          readingProgress: prev.readingProgress.map(r =>
            r.articleId === articleId
              ? {
                  ...r,
                  progress,
                  lastReadAt: new Date().toISOString(),
                  completed: progress >= 100
                }
              : r
          )
        };
      }
      const newProgress: ReadingProgress = {
        articleId,
        progress,
        startedAt: new Date().toISOString(),
        lastReadAt: new Date().toISOString(),
        completed: progress >= 100
      };
      return {
        ...prev,
        readingProgress: [...prev.readingProgress, newProgress]
      };
    });
  }, []);

  const getReadingProgress = useCallback((articleId: string) => {
    return userData.readingProgress.find(r => r.articleId === articleId);
  }, [userData.readingProgress]);

  const completeExperiment = useCallback((experimentId: string) => {
    setUserData(prev => {
      const existing = prev.experimentProgress.find(e => e.experimentId === experimentId);
      if (existing) {
        return {
          ...prev,
          experimentProgress: prev.experimentProgress.map(e =>
            e.experimentId === experimentId
              ? { ...e, completed: true, completedAt: new Date().toISOString() }
              : e
          )
        };
      }
      const newProgress: ExperimentProgress = {
        experimentId,
        completed: true,
        completedAt: new Date().toISOString()
      };
      return {
        ...prev,
        experimentProgress: [...prev.experimentProgress, newProgress]
      };
    });
  }, []);

  const uncompleteExperiment = useCallback((experimentId: string) => {
    setUserData(prev => ({
      ...prev,
      experimentProgress: prev.experimentProgress.map(e =>
        e.experimentId === experimentId
          ? { ...e, completed: false, completedAt: undefined }
          : e
      )
    }));
  }, []);

  const isExperimentCompleted = useCallback((experimentId: string) => {
    return userData.experimentProgress.some(e => e.experimentId === experimentId && e.completed);
  }, [userData.experimentProgress]);

  const getStats = useCallback(() => ({
    favoritesCount: userData.favorites.length,
    notesCount: userData.notes.length,
    articlesRead: userData.readingProgress.filter(r => r.progress > 0).length,
    experimentsCompleted: userData.experimentProgress.filter(e => e.completed).length
  }), [userData]);

  return (
    <UserContext.Provider value={{
      userData,
      addFavorite,
      removeFavorite,
      isFavorite,
      addNote,
      updateNote,
      deleteNote,
      getNotesForArticle,
      updateReadingProgress,
      getReadingProgress,
      completeExperiment,
      uncompleteExperiment,
      isExperimentCompleted,
      getStats
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}