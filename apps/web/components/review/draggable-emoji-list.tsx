'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'motion';
import { motion } from 'motion/react';

import { reviewEmojiMap } from '@/lib/review';
import { Button } from '@/components/ui';
import type { ReviewEmoji } from '@/types/review';

interface Props {
  selectedEmotion: ReviewEmoji | null;
  onEmotionClick: (selected: ReviewEmoji) => void;
}

export default function DraggableEmojiList({
  selectedEmotion,
  onEmotionClick,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [constraint, setConstraint] = useState(0);

  // 1. 제약 조건(constraint) 계산
  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const updateConstraint = () => {
      const scrollWidth = scrollRef.current?.scrollWidth || 0;
      const clientWidth = containerRef.current?.clientWidth || 0;
      setConstraint(
        scrollWidth > clientWidth ? -(scrollWidth - clientWidth) : 0,
      );
    };

    const observer = new ResizeObserver(updateConstraint);
    observer.observe(containerRef.current);
    observer.observe(scrollRef.current);

    return () => observer.disconnect();
  }, []);

  // 2. 선택된 이모지 위치로 이동
  useEffect(() => {
    if (
      selectedEmotion &&
      constraint !== 0 &&
      scrollRef.current &&
      containerRef.current
    ) {
      const buttons = Array.from(scrollRef.current.children) as HTMLElement[];
      const targetButton = buttons.find(
        (btn) =>
          btn.getAttribute('title') === reviewEmojiMap[selectedEmotion].label,
      );

      if (targetButton) {
        const containerWidth = containerRef.current.clientWidth;
        const targetLeft = targetButton.offsetLeft;
        const targetWidth = targetButton.clientWidth;

        // 중앙 정렬을 위한 좌표 계산
        let x = -(targetLeft - containerWidth / 2 + targetWidth / 2);

        // 드래그 가능 범위를 벗어나지 않도록 보정
        if (x > 0) x = 0;
        if (x < constraint) x = constraint;

        // 애니메이션 호출
        animate(
          scrollRef.current,
          { x },
          {
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          },
        );
      }
    }
  }, [selectedEmotion, constraint]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <motion.div
        ref={scrollRef}
        className="py-1 flex gap-1 w-max"
        drag="x"
        dragConstraints={{ right: 0, left: constraint }}
        dragElastic={0.2}
        dragPropagation={true}
      >
        {Object.keys(reviewEmojiMap).map((key) => {
          const currentKey = key as ReviewEmoji;
          const currentEmotion = reviewEmojiMap[currentKey];
          return (
            <Button
              key={key}
              variant={selectedEmotion === currentKey ? 'default' : 'secondary'}
              className="rounded-full shrink-0"
              title={currentEmotion.label}
              onClick={() => onEmotionClick(currentKey)}
            >
              {currentEmotion.emoji}
            </Button>
          );
        })}
      </motion.div>
    </div>
  );
}
