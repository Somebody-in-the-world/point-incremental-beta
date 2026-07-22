import Decimal from "break_eternity.js";

import type { DimensionConfig } from "../dimensional/dimensions";

export const dimensionsData = [
    { baseCost: new Decimal(1), costMultiplier: new Decimal(10) },
    { baseCost: new Decimal(10), costMultiplier: new Decimal(10) },
    { baseCost: new Decimal(1e3), costMultiplier: new Decimal(100) },
    { baseCost: new Decimal(1e5), costMultiplier: new Decimal(100) },
    { baseCost: new Decimal(1e8), costMultiplier: new Decimal(1e3) },
    { baseCost: new Decimal(1e10), costMultiplier: new Decimal(1e3) },
    { baseCost: new Decimal(1e15), costMultiplier: new Decimal(1e4) },
    { baseCost: new Decimal(1e20), costMultiplier: new Decimal(1e5) }
] as const satisfies DimensionConfig[];
