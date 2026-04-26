import type { OmitDeep } from "type-fest";

import type {
    ButtonPreset,
    MilestonePreset,
    PurchasablePreset,
    ThemeConfig
} from "@/game/themes";

import type { CommonThemeData } from "./common";

type CommonThemeTypePath<K extends keyof typeof CommonThemeData & string> =
    `${K}.${keyof (typeof CommonThemeData)[K] & string}`;

export interface RawThemeData extends ThemeConfig {
    buttons: { unstyled: ButtonPreset; spacetime: ButtonPreset };
    purchasable: { unstyled: PurchasablePreset; spacetime: PurchasablePreset };
    milestones: { unstyled: MilestonePreset; achievements: MilestonePreset };
}

export type ThemeData = OmitDeep<
    RawThemeData,
    | CommonThemeTypePath<"buttons">
    | CommonThemeTypePath<"purchasable">
    | CommonThemeTypePath<"milestones">
>;
