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
        // 保持原有配置，只添加绿色主题变量
        green: {
          450: '#10B981', // 自定义绿色
        }
      }
    },
  },
  plugins: [],
}
