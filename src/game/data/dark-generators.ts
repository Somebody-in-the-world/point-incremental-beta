import { Numeric } from "../core/numeric";
import type { DarkGeneratorConfig } from "../dark-matter/dark-generator";

export const darkGeneratorsData = [
    {
        baseCost: new Numeric(1e15),
        costMultiplier: new Numeric(1e5),
        requirement: new Numeric("1e3000")
    }
] as const satisfies DarkGeneratorConfig[];
