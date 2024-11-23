/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    /*     extend: {
      typography: {
        DEFAULT: {
          css: {
            // List items in the editor are encased in a p tag
            // This removes the margin from the p tag,
            // since the list items already have a margin
            li: {
              p: {
                margin: 0,
              },
            },
          },
        },
      },
    }, */
    extend: {
      fontFamily: {
        kablammo: ["Kablammo", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
