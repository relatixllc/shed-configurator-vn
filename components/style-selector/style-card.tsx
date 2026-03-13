"use client";

import type { ComponentType } from "react";

interface StyleCardProps {
  name: string;
  Icon: ComponentType<{ className?: string }>;
  active: boolean;
  recommended: boolean;
  onClick: () => void;
}

export function StyleCard({ name, Icon, active, recommended, onClick }: StyleCardProps) {
  const cls = [
    "scard",
    active ? "active" : "",
    recommended ? "recommended" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={cls} onClick={onClick}>
      <div className="scard-img">
        <Icon />
      </div>
      <div className="scard-name">{name}</div>
    </div>
  );
}
