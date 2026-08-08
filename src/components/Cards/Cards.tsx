export function Card({
  children,
  className = "",
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`rounded-[1.25rem] ${className}`}>{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>;
}
