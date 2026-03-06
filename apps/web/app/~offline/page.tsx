export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh gap-4">
      <svg
        width="80"
        height="80"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="64" height="64" rx="14" fill="#E8956D" />
        <circle cx="32" cy="34" r="22" fill="#fff" />
        <ellipse cx="22" cy="39" rx="5" ry="3" fill="#E8956D" opacity="0.3" />
        <ellipse cx="42" cy="39" rx="5" ry="3" fill="#E8956D" opacity="0.3" />
        <path
          d="M23 31 Q26.5 28 30 31"
          stroke="#C86030"
          stroke-width="2.2"
          stroke-linecap="round"
          fill="none"
        />
        <path
          d="M34 31 Q37.5 28 41 31"
          stroke="#C86030"
          stroke-width="2.2"
          stroke-linecap="round"
          fill="none"
        />
        <path
          d="M28 38 Q32 41 36 38"
          stroke="#C86030"
          stroke-width="1.8"
          stroke-linecap="round"
          fill="none"
        />
      </svg>
      <p className="text-foreground font-medium">인터넷 연결이 없어요</p>
      <p className="text-muted-foreground text-sm">연결 후 다시 시도해주세요</p>
    </div>
  );
}
