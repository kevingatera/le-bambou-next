import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Varela Round'", ...fontFamily.sans],
      },
      colors: {
        button: "#566c6a",
      },
    },
  },
  plugins: [],
} satisfies Config;
