import { Currency } from "../core/currency";
import { Effect } from "../core/effect";
import { format } from "../format";
import { player } from "../player";
import {
    Electrons,
    Neutrons,
    Protons,
    type AtomConstituent
} from "./atom-constituents";

export abstract class Force extends Currency {
    abstract get atomConstituent(): AtomConstituent;
    abstract get effect(): Effect;

    get continuousGainAmount() {
        return this.atomConstituent.effect;
    }
}

export const ElectromagneticForce = new (class extends Force {
    name = "electromagnetic force";
    get atomConstituent() {
        return Protons;
    }

    get amount() {
        return player.electromagneticForce;
    }

    set amount(val) {
        player.electromagneticForce = val;
    }

    get effect() {
        return new Effect({
            formula: () => this.add(1).log10().pow(0.1).div(150).add(1),
            type: "pow"
        });
    }
})();

export const StrongForce = new (class extends Force {
    name = "strong force";
    get atomConstituent() {
        return Neutrons;
    }

    get amount() {
        return player.strongForce;
    }

    set amount(val) {
        player.strongForce = val;
    }

    get effect() {
        return new Effect({
            formula: () => this.add(1).log10().pow(0.2).div(10).add(1),
            type: "mul"
        });
    }
})();

export const WeakForce = new (class extends Force {
    name = "weak force";
    get atomConstituent() {
        return Electrons;
    }

    get amount() {
        return player.weakForce;
    }

    set amount(val) {
        player.weakForce = val;
    }

    get effect() {
        return new Effect({
            formula: () => this.add(1).log10().pow(0.2),
            type: "add",
            formatter: (effect) => `+^${format(effect)}`
        });
    }
})();
