import { Suspense } from 'react';

import AllTodoPage from '@/components/page/all-todo-page';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AllTodoPage />
    </Suspense>
  );
}
