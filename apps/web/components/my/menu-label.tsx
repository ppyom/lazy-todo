interface Props {
  label: string;
  description?: string;
}

export default function MenuLabel({ label, description }: Props) {
  return (
    <div className="text-left">
      <p className="text-sm font-medium">{label}</p>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
