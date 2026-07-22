import Decimal, { type DecimalSource } from "break_eternity.js";

import { format } from "../format";

type EffectFormula = ((boughtAmount: number) => Decimal) | (() => Decimal);
type EffectFormatter = (effect: Decimal, boughtAmount: number) => string;
type EffectType = keyof {
    [K in keyof Decimal as Decimal[K] extends (other: DecimalSource) => Decimal
        ? K
        : never]: Decimal[K];
};

interface EffectConfig {
    formula: EffectFormula;
    formatter?: EffectFormatter | null;
    type: EffectType;
}

export class Effect {
    constructor(public config: EffectConfig) {}

    get formula() {
        return this.config.formula;
    }

    get formatter() {
        if (this.config.formatter !== undefined) {
            return this.config.formatter;
        }
        switch (this.type) {
            case "mul":
                return EffectFormatters.MULTIPLY;
            case "add":
                return EffectFormatters.ADD;
            case "sub":
                return EffectFormatters.SUB;
            case "pow":
                return EffectFormatters.POW;
            // TODO: Add more formatters
        }
        throw new ReferenceError("formatter does not exist");
    }

    get value(): Decimal | null {
        if (this.formula.length === 0) {
            return (this.formula as () => Decimal)();
        } else {
            throw new Error("Effect formula requires boughtAmount");
        }
    }

    get type() {
        return this.config.type;
    }
}

export class CalculatedEffect extends Effect {
    constructor(
        public config: EffectConfig,
        private boughtAmountGetter: () => number
    ) {
        super(config);
    }

    get boughtAmount() {
        return this.boughtAmountGetter();
    }

    get value() {
        return this.boughtAmount ? this.formula(this.boughtAmount) : null;
    }
}

export const EffectFormatters = {
    MULTIPLY: (effect: Decimal) => `${format(effect)}x`,
    ADD: (effect: Decimal) =>
        `+${format(effect, { fixedDigitsBelowThousand: false })}`,
    SUB: (effect: Decimal) =>
        `-${format(effect, { fixedDigitsBelowThousand: false })}`,
    POW: (effect: Decimal) => `^${format(effect, { digitsBelowThousand: 4 })}`
} satisfies Record<string, EffectFormatter>;

export function withEffects(num: Decimal) {
    return {
        value: num,
        apply(effect: Effect | null) {
            if (!effect) return this;
            if (effect.value !== null) {
                this.value = this.value[effect.type](effect.value);
            }
            return this;
        }
    };
}

export function shouldDisplayEffect(effect?: Effect | null) {
    if (effect === null || effect === undefined) return false;
    return effect.formatter !== null;
}

const calculatedEffectCache = new WeakMap<Effect, CalculatedEffect>();

export function calculatedEffectGetter(
    effectObject: Effect | null | undefined,
    amountGetter: () => number
) {
    if (!effectObject) throw new ReferenceError("effect does not exist");
    if (!calculatedEffectCache.has(effectObject)) {
        calculatedEffectCache.set(
            effectObject,
            new CalculatedEffect(effectObject, amountGetter)
        );
    }
    return calculatedEffectCache.get(effectObject)!;
}
