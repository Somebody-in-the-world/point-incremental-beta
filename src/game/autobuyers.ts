import { autobuyersData } from "./data/autobuyers";
import { mapObject } from "./object-utils";
import { player } from "./player";

export type AutobuyerType = "purchase" | "prestige";

export interface AutobuyerConfig {
    action: () => void;
    requirement?: () => boolean;
    name: string;
    type: AutobuyerType;
}

export class Autobuyer {
    constructor(
        public config: AutobuyerConfig,
        public id: string
    ) {
        if (!player.autobuyers[this.id]) {
            player.autobuyers[this.id] = { enabled: false };
        }
    }

    private get playerConfig() {
        return player.autobuyers[this.id]!;
    }

    private set playerConfig(config) {
        player.autobuyers[this.id] = config;
    }

    get enabled() {
        return this.playerConfig.enabled;
    }

    set enabled(value: boolean) {
        this.playerConfig.enabled = value;
    }

    get unlocked() {
        return this.config.requirement?.() ?? true;
    }

    get name() {
        return this.config.name;
    }

    invoke() {
        this.config.action();
    }
}

export const Autobuyers = mapObject(
    autobuyersData,
    (config, id) => new Autobuyer(config, id)
);

export function runAutobuyers() {
    Object.values(Autobuyers).forEach((autobuyer) => {
        if (autobuyer.unlocked && autobuyer.enabled) {
            autobuyer.invoke();
        }
    });
}
