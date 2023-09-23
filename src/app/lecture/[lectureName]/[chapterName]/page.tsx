'use client';

import { submitPractice } from 'app/lib/api';

export default function PracticePage() {
  const submit = () => {
    submitPractice(1);
  };
  return (
    <div>
      <button onClick={submit}>제출</button>
    </div>
  );
}
