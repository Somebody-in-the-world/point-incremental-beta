import Decimal from "break_eternity.js";

import { WeakForce } from "../atomic/forces";
import { Currency } from "../core/currency";
import { Effect, withEffects } from "../core/effect";
import { player } from "../player";
import { DarkGenerators } from "./dark-generator";

export const DarkMatter = new (class extends Currency {
    name = "dark matter";

    get amount() {
        return player.darkMatter;
    }

    set amount(val) {
        player.darkMatter = val;
    }

    get continuousGainAmount() {
        return DarkGenerators[0]?.production ?? new Decimal(0);
    }

    get boostExponent() {
        return withEffects(new Decimal(60)).apply(WeakForce.effect).value;
    }

    get effect() {
        return new Effect({
            formula: () => this.add(1).pow(this.boostExponent),
            type: "mul"
        });
    }
})();
