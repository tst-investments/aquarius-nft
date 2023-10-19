import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        mainBg: "var(--mainBg)",
        gradOne: "var(--gradOne)",
        gradTwo: "var(--gradTwo)",
        cardOne: "var(--cardOne)",
        cardTwo: "var(--cardTwo)",
        linkColor: "var(--linkColor)",
        icon: "var(--icon)",
        camera: "var(--camera)",
        modalText: "var(--modalText)",
        leaderboardText: "var(--leaderboardText)",
        headerText: "var(--headerText)",
        mainText: "var(--mainText)",
        freeUseText: "var(--freeUseText)",
        bgFreeUse: "var(--bgFreeUse)",
        primaryBtnText: "var(--primaryBtnText)",
        secondaryBtnText: "var(--secondaryBtnText)",
        cream: "#ecebe6",
        default: {
          50: "#141414",
          100: "#242424",
          200: "#3D3D3D",
          300: "#525252",
          400: "#6B6B6B",
          500: "#858585",
          600: "#A0A09C",
          700: "#B9B9B6",
          800: "#DDDDDA",
          900: "#ECECE9",
        },
      },
      gradientColorStopPositions: {
        33: "33%",
      },
    },
  },
  plugins: [],
};
export default config;
