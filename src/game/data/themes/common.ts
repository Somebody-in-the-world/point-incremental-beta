import type { ThemeConfig } from "@/game/themes";

export const CommonThemeData = {
    name: "",
    buttons: {
        spacetime: {
            normal: {
                backgroundColor: "black",
                color: "white",
                borderColor: "white"
            },
            hovered: {
                backgroundColor: "white",
                color: "black",
                borderColor: "black"
            },
            disabled: {
                backgroundColor: "white",
                color: "black",
                borderColor: "black"
            },
            global: { transition: "all 0.5s" }
        }
    },
    purchasable: {},
    milestones: {}
} as const satisfies ThemeConfig;
