import {
  Battery,
  CircleDot,
  Cog,
  Disc,
  Droplets,
  Gem,
  Hammer,
  LifeBuoy,
  Package,
  PaintRoller,
  Shield,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Sun,
  Truck,
  Wrench,
} from 'lucide-react'

// Maps the `icon` names used in data/services.js to lucide icons.
const icons = {
  wrench: Wrench,
  cog: Cog,
  hammer: Hammer,
  'paint-roller': PaintRoller,
  'shield-check': ShieldCheck,
  snowflake: Snowflake,
  'circle-dot': CircleDot,
  battery: Battery,
  disc: Disc,
  sparkles: Sparkles,
  gem: Gem,
  shield: Shield,
  sun: Sun,
  package: Package,
  'life-buoy': LifeBuoy,
  droplets: Droplets,
  truck: Truck,
}

export default function ServiceIcon({ name, ...props }) {
  const Icon = icons[name] ?? Wrench
  return <Icon aria-hidden="true" {...props} />
}
