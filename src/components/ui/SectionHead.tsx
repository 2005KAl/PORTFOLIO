interface Props {
  title: string;
  accent: string;
  className?: string;
  id?: string;
}

/** Bold section heading ending in one serif-italic word. */
export default function SectionHead({ title, accent, className = "", id }: Props) {
  return (
    <header className={className}>
      <h2 id={id} className="h-display text-[clamp(40px,6.4vw,92px)]">
        <span className="rv-mask">
          <span>
            {title} <em>{accent}</em>
          </span>
        </span>
      </h2>
    </header>
  );
}
