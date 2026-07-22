import Decimal from "break_eternity.js";

import { Currency } from "../core/currency";
import { player } from "../player";
import { Particles } from "./atomic";

export abstract class AtomConstituent extends Currency {
    assignOne() {
        if (Particles.lt(1)) return;
        this.amount = this.add(1);
        Particles.amount = Particles.sub(1);
    }

    assignAll() {
        this.amount = this.add(Particles);
        Particles.amount = new Decimal(0);
    }

    get effect() {
        return this.pow(2);
    }
}

export const Protons = new (class extends AtomConstituent {
    name = "proton";

    get amount() {
        return player.protons;
    }

    set amount(val) {
        player.protons = val;
    }
})();

export const Neutrons = new (class extends AtomConstituent {
    name = "neutron";

    get amount() {
        return player.neutrons;
    }

    set amount(val) {
        player.neutrons = val;
    }
})();

export const Electrons = new (class extends AtomConstituent {
    name = "electron";

    get amount() {
        return player.electrons;
    }

    set amount(val) {
        player.electrons = val;
    }
})();
