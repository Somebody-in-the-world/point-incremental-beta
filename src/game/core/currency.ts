import Decimal from "break_eternity.js";

export abstract class Currency extends Decimal {
    name = "";

    abstract get amount(): Decimal;
    abstract set amount(value);

    get mag() {
        return this.amount.mag;
    }

    set mag(val) {
        this.amount.mag = val;
    }

    get sign() {
        return this.amount.sign;
    }

    set sign(val) {
        this.amount.sign = val;
    }

    get layer() {
        return this.amount.layer;
    }

    set layer(val) {
        this.amount.layer = val;
    }

    get gainAmount() {
        return new Decimal(0);
    }

    get continuousGainAmount() {
        return new Decimal(0);
    }

    gain() {
        this.amount = this.add(this.gainAmount);
        this.postGain(this.gainAmount);
    }

    continuousGain(deltaTime: number) {
        this.amount = this.add(this.continuousGainAmount.mul(deltaTime));
        this.postContinousGain(this.continuousGainAmount.mul(deltaTime));
    }

    protected postGain(_gainAmount: Decimal) {}
    protected postContinousGain(_gainAmount: Decimal) {}
}
