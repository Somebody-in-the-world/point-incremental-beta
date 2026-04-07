import { reactive, markRaw, type Component, type Raw } from "vue";

import { tabData } from "./data/tabs";
import { mapObject } from "./object-utils";

export interface TabConfig {
    name: string;
    component: Component;
    unlockCondition?: () => boolean;
    subtabs?: Record<string, TabConfig>;
}

export interface TabsObject<TConfig extends Record<string, TabConfig> = never> {
    tabs: {
        [key in keyof TConfig]: Tab;
    };
    tab(tab: keyof TConfig): Tab;
    currentID: keyof TConfig;
    current: Tab;
    currentTabComponent: Component;
}

export class Tab {
    subtabs?: Record<string, SubTab>;
    currentSubTabID?: string;

    constructor(
        public config: TabConfig,
        public id: string
    ) {
        if (config.subtabs) {
            this.subtabs = mapObject(
                markRawComponents(config.subtabs),
                (config, id) => new SubTab(config, id, this)
            );
            this.currentSubTabID = Object.keys(this.subtabs)[0];
        }
    }

    subtab(subtab: string) {
        if (!this.subtabs)
            throw new ReferenceError(
                "Cannot access subtabs when tab has no subtabs"
            );
        return this.subtabs[subtab];
    }

    get currentSubTab() {
        return this.subtabs?.[this.currentSubTabID ?? ""];
    }

    get name() {
        return this.config.name;
    }

    get unlockCondition() {
        return this.config.unlockCondition;
    }

    get unlocked(): boolean {
        return this.unlockCondition?.() ?? true;
    }

    get component() {
        return this.config.component;
    }

    get isCurrent(): boolean {
        return Tabs.currentID === this.id;
    }

    enter() {
        Tabs.currentID = this.id as keyof typeof tabData;
    }
}

export class SubTab extends Tab {
    constructor(
        public config: TabConfig,
        public id: string,
        public parent: Tab | SubTab
    ) {
        super(config, id);
    }

    get isCurrent() {
        return this.parent.currentSubTabID === this.id;
    }

    enter() {
        this.parent.currentSubTabID = this.id;
    }
}

function markRawComponents<T extends Record<string, TabConfig>>(
    tabs: T
): {
    [K in keyof T]: { component: Raw<T[K]["component"]> } & Omit<
        T[K],
        "component"
    >;
} {
    const result = {} as {
        [K in keyof T]: { component: Raw<T[K]["component"]> } & Omit<
            T[K],
            "component"
        >;
    };
    for (const tab in tabs) {
        result[tab] = {
            ...tabs[tab]!,
            component: markRaw(tabs[tab]!.component)
        };
    }
    return result;
}

export const Tabs = reactive({
    tabs: mapObject(
        markRawComponents(tabData),
        (config, id) => new Tab(config, id)
    ),
    currentID: "main",
    tab(tab: keyof typeof tabData) {
        return this.tabs[tab];
    },
    get current() {
        return this.tabs[this.currentID];
    },
    get currentTabComponent() {
        let tab: Tab | SubTab = this.current;
        while (tab.subtabs) tab = tab.currentSubTab ?? tab;
        return tab.component;
    }
} as TabsObject<typeof tabData>);
