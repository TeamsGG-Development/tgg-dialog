/** @type {import('tailwindcss').Config} */



// --primary: #2c2c2c;
// --secondary: #424050;
// --accent: #00959a;

// --text-primary: #faf7ff;
// --text-secondary: #2b2b2b;


export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
  darkMode: 'class',
  theme: {
    extend: {
        colors: {
            primary: '#0f172a',
            secondary: '#1e293b',
            accent: '#3b82f6',

            'txt-primary': '#f8fafc',
            'txt-secondary': '#94a3b8',
        },
        backgroundColor: {
            transparent: 'transparent',
        }
    },
  },
  plugins: [],
}

