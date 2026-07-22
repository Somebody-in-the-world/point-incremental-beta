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
        },
        atomic: {
            normal: { color: "#60a0ff", backgroundColor: "#183060" },
            hovered: {
                color: "#4080d0",
                backgroundColor: "#183060",
                borderColor: "#4080d0"
            },
            disabled: {
                color: "#4080d0",
                backgroundColor: "#183060",
                borderColor: "#4080d0"
            },
            global: { transition: "0.3s", border: "2px solid #60a0ff" }
        }
    },
    purchasable: {},
    milestones: {},
    elements: {
        unstyled: {},
        spacetime: { normal: { backgroundColor: "black", color: "white" } }
    },
    text: {
        unstyled: {},
        atomic: { normal: { color: "#60a0ff", textShadow: "1px 1px 5px" } },
        proton: { normal: { color: "#ff8080", textShadow: "1px 1px 5px" } },
        neutron: { normal: { color: "#0080ff", textShadow: "1px 1px 5px" } },
        electron: { normal: { color: "#d0d000", textShadow: "1px 1px 5px" } }
    }
} as const satisfies ThemeConfig;
