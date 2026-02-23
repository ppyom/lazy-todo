export enum TodoStatus {
  IN_PROGRESS = 'IN_PROGRESS', // 🌱 진행중
  DEFERRED = 'DEFERRED', // ⌛ 미뤄둠
  ARCHIVED = 'ARCHIVED', // 🧹 정리함
  COMPLETED = 'COMPLETED', // 🌟 완료
}

export enum DeferReason {
  LOW_ENERGY = 'LOW_ENERGY', // 🪫 에너지 부족
  LACK_OF_TIME = 'LACK_OF_TIME', // ⌛ 시간 부족
  DISTRACTED = 'DISTRACTED', // 🌀 정신없음
  JUST_CANT = 'JUST_CANT', // 🫥 그냥 하기 싫음
  OTHER = 'OTHER', // 💬 다른 이유
}

export interface Todo {
  id: string;
  content: string;
  status: TodoStatus;
  deferCount: number;
  deferReason?: DeferReason;
  createdAt: string;
  updatedAt: string;
}
