interface IconProps {
  className?: string;
}

export function UtilityIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 72 54" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="10" y="24" width="52" height="26" rx="1" fill="currentColor" opacity="0.3" />
      <polygon points="8,24 36,8 64,24" fill="currentColor" opacity="0.45" />
      <rect x="28" y="34" width="10" height="16" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="44" y="30" width="8" height="8" rx="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export function LoftedUtilityIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 72 54" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="10" y="22" width="52" height="28" rx="1" fill="currentColor" opacity="0.3" />
      <polygon points="8,22 36,4 64,22" fill="currentColor" opacity="0.45" />
      <line x1="10" y1="28" x2="62" y2="28" stroke="currentColor" opacity="0.25" strokeWidth="0.75" />
      <rect x="12" y="22" width="14" height="6" rx="0.5" fill="currentColor" opacity="0.2" />
      <rect x="28" y="34" width="10" height="16" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="44" y="30" width="8" height="8" rx="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export function GarageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 72 54" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="8" y="18" width="56" height="32" rx="1" fill="currentColor" opacity="0.3" />
      <polygon points="6,18 36,4 66,18" fill="currentColor" opacity="0.45" />
      <rect x="14" y="28" width="44" height="22" rx="1" fill="currentColor" opacity="0.5" />
      <line x1="14" y1="34" x2="58" y2="34" stroke="currentColor" opacity="0.15" strokeWidth="0.75" />
      <line x1="14" y1="40" x2="58" y2="40" stroke="currentColor" opacity="0.15" strokeWidth="0.75" />
      <line x1="14" y1="46" x2="58" y2="46" stroke="currentColor" opacity="0.15" strokeWidth="0.75" />
    </svg>
  );
}

export function LoftedBarnIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 72 54" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="10" y="20" width="52" height="30" rx="1" fill="currentColor" opacity="0.3" />
      <path d="M10,20 L10,14 Q10,8 20,6 L36,2 L52,6 Q62,8 62,14 L62,20 Z" fill="currentColor" opacity="0.45" />
      <line x1="10" y1="26" x2="62" y2="26" stroke="currentColor" opacity="0.25" strokeWidth="0.75" />
      <rect x="12" y="20" width="14" height="6" rx="0.5" fill="currentColor" opacity="0.2" />
      <rect x="46" y="20" width="14" height="6" rx="0.5" fill="currentColor" opacity="0.2" />
      <rect x="26" y="34" width="14" height="16" rx="1" fill="currentColor" opacity="0.5" />
      <line x1="33" y1="34" x2="33" y2="50" stroke="currentColor" opacity="0.2" strokeWidth="0.75" />
    </svg>
  );
}

export function LoftedBarnSideIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 72 54" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="10" y="20" width="52" height="30" rx="1" fill="currentColor" opacity="0.3" />
      <path d="M10,20 L10,14 Q10,8 20,6 L36,2 L52,6 Q62,8 62,14 L62,20 Z" fill="currentColor" opacity="0.45" />
      <line x1="10" y1="26" x2="62" y2="26" stroke="currentColor" opacity="0.25" strokeWidth="0.75" />
      <rect x="12" y="20" width="14" height="6" rx="0.5" fill="currentColor" opacity="0.2" />
      <rect x="46" y="20" width="14" height="6" rx="0.5" fill="currentColor" opacity="0.2" />
      <rect x="10" y="34" width="12" height="16" rx="1" fill="currentColor" opacity="0.5" />
      <line x1="16" y1="34" x2="16" y2="50" stroke="currentColor" opacity="0.2" strokeWidth="0.75" />
    </svg>
  );
}

export function CabinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 72 54" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="10" y="22" width="42" height="28" rx="1" fill="currentColor" opacity="0.3" />
      <polygon points="8,22 31,6 54,22" fill="currentColor" opacity="0.45" />
      <rect x="54" y="22" width="12" height="28" fill="currentColor" opacity="0.15" />
      <line x1="54" y1="22" x2="54" y2="50" stroke="currentColor" opacity="0.2" strokeWidth="0.75" />
      <polygon points="54,22 66,22 66,16" fill="currentColor" opacity="0.25" />
      <rect x="20" y="34" width="10" height="16" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="36" y="30" width="8" height="8" rx="1" fill="currentColor" opacity="0.2" />
      <line x1="58" y1="28" x2="58" y2="50" stroke="currentColor" opacity="0.15" strokeWidth="4" strokeLinecap="round" />
      <line x1="62" y1="28" x2="62" y2="50" stroke="currentColor" opacity="0.15" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export const SHED_ICONS = [
  UtilityIcon,
  LoftedUtilityIcon,
  GarageIcon,
  LoftedBarnIcon,
  LoftedBarnSideIcon,
  CabinIcon,
];
