/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        jackpot: {
          primary: '#10B981',    // 翠绿色
          secondary: '#059669',  // 深绿色
          accent: '#34D399',     // 亮绿色
          gold: '#F59E0B',       // 保留一点金色作为点缀
        }
      },
      backgroundImage: {
        'jackpot-gradient': 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)',
        'green-gradient': 'linear-gradient(135deg, #34D399 0%, #10B981 50%, #059669 100%)',
      }
    },
  },
  plugins: [],
}
