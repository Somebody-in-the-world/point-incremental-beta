import Decimal from "break_eternity.js";

import { Currency } from "./currency";

export abstract class PrestigeCurrency extends Currency {
    get nextRequirement() {
        return new Decimal(0);
    }
}
