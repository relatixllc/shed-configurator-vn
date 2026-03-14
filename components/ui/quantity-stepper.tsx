"use client";

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function QuantityStepper({ value, min = 1, max = 10, onChange }: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <span className="font-sans text-[clamp(0.62rem,2vw,0.7rem)] font-semibold text-[var(--color-text-muted)]">
        Qty:
      </span>
      <button
        className="w-[26px] h-[26px] rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-medium text-[var(--color-text)] cursor-pointer flex items-center justify-center transition-all select-none p-0 leading-none hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] active:scale-95"
        onClick={() => value > min && onChange(value - 1)}
      >
        -
      </button>
      <span className="font-mono text-[clamp(0.68rem,2.2vw,0.78rem)] font-medium min-w-5 text-center text-[var(--color-text)]">
        {value}
      </span>
      <button
        className="w-[26px] h-[26px] rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-medium text-[var(--color-text)] cursor-pointer flex items-center justify-center transition-all select-none p-0 leading-none hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] active:scale-95"
        onClick={() => value < max && onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
