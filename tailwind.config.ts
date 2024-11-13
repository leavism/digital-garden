import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Playfair Display", ...fontFamily.sans],
      },
      backgroundImage: {
        "radial-at-center":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
        "radial-at-top":
          "radial-gradient(circle at top, var(--tw-gradient-stops))",
        "radial-at-bottom":
          "radial-gradient(circle at bottom, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
} satisfies Config;
