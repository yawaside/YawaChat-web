import {
  BellRing,
  Clapperboard,
  Coins,
  Gamepad2,
  Gift,
  Keyboard,
  Layers,
  LifeBuoy,
  Mic,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  Tv,
  type LucideIcon,
} from "lucide-react";
import type { FeatureIcon } from "../lib/data";

const ICONS: Record<FeatureIcon, LucideIcon> = {
  layers: Layers,
  sparkles: Sparkles,
  coins: Coins,
  bell: BellRing,
  gift: Gift,
  plus: PlusCircle,
  mic: Mic,
  shield: ShieldCheck,
  tv: Tv,
  life: LifeBuoy,
  gamepad: Gamepad2,
  obs: Clapperboard,
  keyboard: Keyboard,
};

export default function FeatureGlyph({ icon, className = "" }: { icon: FeatureIcon; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={className} aria-hidden="true" />;
}
