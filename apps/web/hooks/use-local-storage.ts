'use client';

import { useEffect, useState } from 'react';

/**
 * 로컬 스토리지(localStorage)와 상태(state)를 동기화하는 커스텀 훅
 * @template T 저장할 데이터의 타입
 * @param {string} key 로컬 스토리지에 사용할 고유 키
 * @param {T} initialValue 초기 상태값 (스토리지에 데이터가 없을 경우 사용될 값)
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} 현재 상태값과 상태를 업데이트하는 함수 반환
 * @example
 *  const [todoList, setTodoList] = useLocalStorage<Todo[]>('todos', []);
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`localStorage key “${key}” 읽기 실패:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`localStorage key “${key}” 쓰기 실패:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
