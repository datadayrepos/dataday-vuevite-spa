const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  // mode: 'jit',
  purge: {
    // enabled: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  },
  darkMode: 'class', // or 'media' or 'class' or false
  theme: {
    // overrides default px and sets units as rem, to compensate for zoom and font-size,. 1em=16px default
    screens: {
      'sm': '40rem',
      // => @media (min-width: 640px) { ... }

      'md': '48rem',
      // => @media (min-width: 768px) { ... }

      'lg': '64rem',
      // => @media (min-width: 1024px) { ... }

      'xl': '80rem',
      // => @media (min-width: 1280px) { ... }

      '2xl': '96rem',
      // => @media (min-width: 1536px) { ... }
    },
    /*
        backgroundColor: theme => ({
        'abygl': '#3490dc',
        'abygm': '#ffed4a',
        'abygd': '#e3342f',
        })
        */
    groups: ['tooltip'],
    extend: {
      colors: {
        orange: colors.orange,
        ...{
          // primary refers to tw base colros
          // complementary refers to split-complementary of the primary-500 color. Using this adobe tool: https://color.adobe.com/create/color-wheel
          // https://www.tints.dev/brand/E06623
          // red / grass
          //	primary: { "50": "#fef2f2", "100": "#fee2e2", "200": "#fecaca", "300": "#fca5a5", "400": "#f87171", "500": "#ef4444", "600": "#dc2626", "700": "#b91c1c", "800": "#991b1b", "900": "#7f1d1d" },
          //  complimentary: { 50: "#EDFDEC", 100: "#DCFCD9", 200: "#B8F9B3", 300: "#95F68E", 400: "#71F368", 500: "#4FF043", 600: "#20E312", 700: "#18AA0E", 800: "#107109", 900: "#083905", 950: "#041C02" },

          // orange / skylike
          //	primary: { "50": "#fff7ed", "100": "#ffedd5", "200": "#fed7aa", "300": "#fdba74", "400": "#fb923c", "500": "#f97316", "600": "#ea580c", "700": "#c2410c", "800": "#9a3412", "900": "#7c2d12" },
          // complimentary: { 50: "#E6F5FE", 100: "#D2ECFE", 200: "#A0D8FD", 300: "#73C5FC", 400: "#46B3FB", 500: "#169FFA", 600: "#0583D7", 700: "#0361A0", 800: "#024069", 900: "#012137", 950: "#010F19" },

          // amber / winterblue
          //	primary: { "50": "#fffbeb", "100": "#fef3c7", "200": "#fde68a", "300": "#fcd34d", "400": "#fbbf24", "500": "#f59e0b", "600": "#d97706", "700": "#b45309", "800": "#92400e", "900": "#78350f" },
          // complimentary: { 50: "#E6F9FE", 100: "#CEF4FD", 200: "#9DE8FB", 300: "#6CDDF9", 400: "#3BD1F7", 500: "#0AC6F5", 600: "#089EC4", 700: "#067793", 800: "#044F62", 900: "#022831",950: "#011419" },

          // yellow/blue
          primary: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12' },
          complimentary: { 50: '#E6F2FE', 100: '#CDE6FE', 200: '#97C9FC', 300: '#65B0FA', 400: '#2F94F9', 500: '#0778EB', 600: '#0661BC', 700: '#044A90', 800: '#03305E', 900: '#011A32', 950: '#010D19' },

          // lime / violet
          //	primary: { "50": "#f7fee7", "100": "#ecfccb", "200": "#d9f99d", "300": "#bef264", "400": "#a3e635", "500": "#84cc16", "600": "#65a30d", "700": "#4d7c0f", "800": "#3f6212", "900": "#365314" },
          // scomplimentary: { 50: "#EFE3FC", 100: "#E2CCFA", 200: "#C59AF4", 300: "#A967EF", 400: "#8930E9", 500: "#6D16CC", 600: "#5711A1", 700: "#430D7C", 800: "#2D0953", 900: "#160429", 950: "#0A0212" },

          // green / cold red
          //	primary: { "50": "#f0fdf4", "100": "#dcfce7", "200": "#bbf7d0", "300": "#86efac", "400": "#4ade80", "500": "#22c55e", "600": "#16a34a", "700": "#15803d", "800": "#166534", "900": "#14532d" },
          // complimentary: { 50: '#FBE5EF', 100: '#F7CFE1', 200: '#EF9FC3', 300: '#E76FA5', 400: '#DF3F87', 500: '#C4216B', 600: '#9D1A55', 700: '#761440', 800: '#4F0D2B', 900: '#270715', 950: '#110309' },

          // emerald / warm red
          //	primary: { "50": "#ecfdf5", "100": "#d1fae5", "200": "#a7f3d0", "300": "#6ee7b7", "400": "#34d399", "500": "#10b981", "600": "#059669", "700": "#047857", "800": "#065f46", "900": "#064e3b" },
          // complimentary: { 50: "#FCE3E3", 100: "#FAC8C7", 200: "#F5918F", 300: "#F05957", 400: "#EB221F", 500: "#BA1511", 600: "#96100E", 700: "#700C0A", 800: "#4B0807", 900: "#250403", 950: "#130202" },

          // teal / fire red
          //	primary: { "50": "#f0fdfa", "100": "#ccfbf1", "200": "#99f6e4", "300": "#5eead4", "400": "#2dd4bf", "500": "#14b8a6", "600": "#0d9488", "700": "#0f766e", "800": "#115e59", "900": "#134e4a" },
          // complimentary: { 50: "#FCE7E3", 100: "#F9CEC8", 200: "#F39E91", 300: "#ED6D59", 400: "#E73C22", 500: "#B82A14", 600: "#932110", 700: "#6E190C", 800: "#4A1108", 900: "#250804", 950: "#120402" },

          // cyan / fire red
          //	primary: { "50": "#ecfeff", "100": "#cffafe", "200": "#a5f3fc", "300": "#67e8f9", "400": "#22d3ee", "500": "#06b6d4", "600": "#0891b2", "700": "#0e7490", "800": "#155e75", "900": "#164e63" },
          // complimentary: { 50: "#FEE9E1", 100: "#FDD7C8", 200: "#FCAC8D", 300: "#FA8556", 400: "#F95A1B", 500: "#D43F06", 600: "#A93305", 700: "#812704", 800: "#541A02", 900: "#2D0E01", 950: "#140601" },

          // sky / orange red
          //	primary: { "50": "#f0f9ff", "100": "#e0f2fe", "200": "#bae6fd", "300": "#7dd3fc", "400": "#38bdf8", "500": "#0ea5e9", "600": "#0284c7", "700": "#0369a1", "800": "#075985", "900": "#0c4a6e" },
          // complimentary: {   50: "#FEEFE7", 100: "#FCDFCF", 200: "#F9BD9A", 300: "#F69D6A", 400: "#F37E3A", 500: "#E85F0E",600: "#BC4C0B",700: "#8B3808",800: "#5B2506",900: "#301303",950: "#180A01"},

          // blue / orange
          //	primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a" },
          // complimentary: { 50: "#FEF5EC", 100: "#FDECD8", 200: "#FBD9B1", 300: "#F9C58B", 400: "#F7B264", 500: "#F59F3B", 600: "#E9820C", 700: "#AF6109", 800: "#744106", 900: "#3A2003", 950: "#1D1001" },

          // indigo / golden
          //	primary: { "50": "#eef2ff", "100": "#e0e7ff", "200": "#c7d2fe", "300": "#a5b4fc", "400": "#818cf8", "500": "#6366f1", "600": "#4f46e5", "700": "#4338ca", "800": "#3730a3", "900": "#312e81" },
          // complimentary: { 50: '#FBF7EF', 100: '#F7EFDE', 200: '#EFDFBE', 300: '#E5CD99', 400: '#DDBD78', 500: '#D5AD57', 600: '#C09230', 700: '#8F6D24', 800: '#624B18', 900: '#31250C', 950: '#181306' },

          // violet
          //	primary: { "50": "#f5f3ff", "100": "#ede9fe", "200": "#ddd6fe", "300": "#c4b5fd", "400": "#a78bfa", "500": "#8b5cf6", "600": "#7c3aed", "700": "#6d28d9", "800": "#5b21b6", "900": "#4c1d95" },
          // complimentary: { 50: "#FEFBF1", 100: "#FDF7DD", 200: "#FBEEBC", 300: "#F9E79F", 400: "#F7DF7D", 500: "#F5D75B", 600: "#F1C71D", 700: "#C09C0C", 800: "#7D6608", 900: "#3E3304", 950: "#221B02" },

          // purple / teal
          //  primary: { 50: '#F5ECFE', 100: '#EEDDFD', 200: '#DCBBFC', 300: '#CB99FA', 400: '#BA77F9', 500: '#A854F7', 600: '#8815F4', 700: '#6609BE', 800: '#44067F', 900: '#22033F', 950: '#10011D' },
          // complimentary: { 50: '#FEFCEC', 100: '#FDFADD', 200: '#FCF4BB', 300: '#FAEF99', 400: '#F9E977', 500: '#F7E554', 600: '#F4DA15', 700: '#BEA909', 800: '#7F7106', 900: '#3F3803', 950: '#1D1A01' },

          // fuchsia
          //	primary: { "50": "#fdf4ff", "100": "#fae8ff", "200": "#f5d0fe", "300": "#f0abfc", "400": "#e879f9", "500": "#d946ef", "600": "#c026d3", "700": "#a21caf", "800": "#86198f", "900": "#701a75" },
          //  complimentary: {      50: "#FCFDEC", 100: "#FAFCD9", 200: "#F4F9B4", 300: "#EFF68E",400: "#EAF36D",500: "#E4F046",600: "#D9E713",700: "#9FAA0E",800: "#6A7109",900: "#353905",950: "#1B1C02"},

          // pink / neon green
          //	primary: { "50": "#fdf2f8", "100": "#fce7f3", "200": "#fbcfe8", "300": "#f9a8d4", "400": "#f472b6", "500": "#ec4899", "600": "#db2777", "700": "#be185d", "800": "#9d174d", "900": "#831843" },
          // complimentary: { 50: "#F3FDEC", 100: "#E8FBDA", 200: "#D1F8B5", 300: "#BCF494", 400: "#A5F16F", 500: "#8EED4A", 600: "#6CE317", 700: "#51AC11", 800: "#356F0B", 900: "#1A3806", 950: "#0D1C03" },

          // rose / neon green2
          //	primary: {"50": "#fff1f2", "100": "#ffe4e6", "200": "#fecdd3", "300": "#fda4af", "400": "#fb7185", "500": "#f43f5e", "600": "#e11d48", "700": "#be123c", "800": "#9f1239", "900": "#881337"},
          // complimentary: { 50: "#EFFEEC", 100: "#DFFDD8", 200: "#BFFBB1", 300: "#9FF98B", 400: "#7FF764", 500: "#61F540", 600: "#35E90C", 700: "#27AE09", 800: "#1A7406", 900: "#0D3A03", 950: "#071D02" },

          alert: { 50: '#FCEFE9', 100: '#F9E0D2', 200: '#F2C0A6', 300: '#ECA179', 400: '#E68551', 500: '#E06623', 600: '#B7511A', 700: '#863B13', 800: '#59270D', 900: '#2D1406', 950: '#160A03' },
          // grey scales
          sharp: { 50: '#E8E8E8', 100: '#D1D1D1', 200: '#A3A3A3', 300: '#757575', 400: '#474747', 500: '#191919', 600: '#141414', 700: '#0F0F0F', 800: '#0A0A0A', 900: '#050505', 950: '#030303' },
          light: { 50: '#FAFAFA', 100: '#F7F7F7', 200: '#F0F0F0', 300: '#E6E6E6', 400: '#DEDEDE', 500: '#D6D6D6', 600: '#ABABAB', 700: '#808080', 800: '#575757', 900: '#2B2B2B', 950: '#141414' },
          mute: { 50: '#FAFAFA', 100: '#F7F7F7', 200: '#F0F0F0', 300: '#E6E6E6', 400: '#DEDEDE', 500: '#D6D6D6', 600: '#ABABAB', 700: '#808080', 800: '#575757', 900: '#2B2B2B', 950: '#141414' },
          soft: { 50: '#FCFCFC', 100: '#FAFAFA', 200: '#F5F5F5', 300: '#F0F0F0', 400: '#EBEBEB', 500: '#E5E5E5', 600: '#B8B8B8', 700: '#8A8A8A', 800: '#5C5C5C', 900: '#2E2E2E', 950: '#171717' },
          fog: { 50: '#EBEBEB', 100: '#D4D4D4', 200: '#A8A8A8', 300: '#7D7D7D', 400: '#525252', 500: '#272727', 600: '#1F1F1F', 700: '#171717', 800: '#0F0F0F', 900: '#080808', 950: '#050505' },
        },
        spacing: {
          15: '3.75rem', // following the standard of 128 / 4 = 32
        },
        height: {
          '10v': '10vh',
          '20v': '20vh',
          '30v': '30vh',
          '40v': '40vh',
          '50v': '50vh',
          '60v': '60vh',
          '70v': '70vh',
          '80v': '80vh',
          '90v': '90vh',
          '100v': '100vh',
        },
        // https://tailwindcss.com/docs/screens#adding-larger-breakpoints
        // additional breakpoints
        screens: {
          xs: '25rem', // 400px
          mds: '41.7rem', // 667px
          wide: '120rem', // 1920px
          verywide: '160rem', // 2560px
          superwide: '187.5rem', // 3000px
        },
        zIndex: {
          1: '1',
          1999: '1999',
          9999: '9999',
        },
      },
    },
    variants: {
      margin: ['responsive', 'hover', 'first'],
      textColor: ['responsive', 'hover', 'focus', 'group-hover'],
      background: ['responsive', 'hover', 'focus', 'group-hover'],
      extend: {},
    },
    corePlugins: {
      //  preflight: false,
    },
    plugins: [
      plugin(({ addVariant, theme }) => {
        const groups = theme('groups') || []

        groups.forEach((group) => {
          addVariant(`group-${group}-hover`, () => {
            return `:merge(.group-${group}):hover &`
          })
        })
      }),
    ],
  },
}