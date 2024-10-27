module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust according to your project's structure
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#D1C4E9", // Light purple for backgrounds
          DEFAULT: "#7C4DFF", // Primary purple
          dark: "#6200EA", // Darker purple for buttons/accents
        },
        secondary: {
          light: "#82B1FF", // Light blue for accents
          DEFAULT: "#448AFF", // Primary blue
          dark: "#2979FF", // Dark blue for hover/focus
        },
        neutral: {
          light: "#F5F5F5", // Light background color
          DEFAULT: "#9E9E9E", // Neutral gray for text
          dark: "#424242", // Dark gray for darker accents
        },
        accent: "#FF4081", // Bright pink for attention-catching elements
        gradientStart: "#7C4DFF", // Gradient start color
        gradientEnd: "#448AFF", // Gradient end color
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
