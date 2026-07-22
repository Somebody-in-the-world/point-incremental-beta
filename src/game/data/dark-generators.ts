import Decimal from "break_eternity.js";

import type { DarkGeneratorConfig } from "../dark-matter/dark-generator";

export const darkGeneratorsData = [
    {
        baseCost: new Decimal(1e15),
        costMultiplier: new Decimal(1e3),
        requirement: new Decimal("1e3000"),
        multiplier: new Decimal(10)
    },
    {
        baseCost: new Decimal(1e30),
        costMultiplier: new Decimal(1e5),
        requirement: new Decimal("1e6350"),
        multiplier: new Decimal(12)
    },
    {
        baseCost: new Decimal(1e60),
        costMultiplier: new Decimal(1e10),
        requirement: new Decimal("1e11750"),
        multiplier: new Decimal(14)
    },
    {
        baseCost: new Decimal(1e100),
        costMultiplier: new Decimal(1e15),
        requirement: new Decimal("1e20000"),
        multiplier: new Decimal(17)
    },
    {
        baseCost: new Decimal("1e340"),
        costMultiplier: new Decimal(1e20),
        requirement: new Decimal("1e60000"),
        multiplier: new Decimal(20)
    },
    {
        baseCost: new Decimal("1e425"),
        costMultiplier: new Decimal(1e25),
        requirement: new Decimal("1e75000"),
        multiplier: new Decimal(25)
    }
] as const satisfies DarkGeneratorConfig[];
