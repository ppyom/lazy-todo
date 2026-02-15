export type TodoStatus =
  | 'IN_PROGRESS' // 🌱 진행중
  | 'DEFERRED' // ⌛ 미뤄둠
  | 'ARCHIVED' // 🧹 정리함
  | 'COMPLETED'; // 🌟 완료

export type DeferReason =
  | 'LOW_ENERGY' // 🪫 에너지 부족
  | 'LACK_OF_TIME' // ⌛ 시간 부족
  | 'DISTRACTED' // 🌀 정신없음
  | 'JUST_CANT' // 🫥 그냥 하기 싫음
  | 'OTHER'; // 💬 다른 이유

export interface Todo {
  id: string;
  content: string;
  status: TodoStatus;
  deferCount: number;
  deferReason?: DeferReason;

  createdAt: Date;
  updatedAt: Date;
}
