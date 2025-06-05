import { opacity } from 'html2canvas/dist/types/css/property-descriptors/opacity'
import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
		keyframes: {
			"caret-blink": {
				"0%,70%,100%": { opacity: "1" },
				"20%,50%": { opacity: "0" },
			},
			"wiggle": {
				"0%, 100%": { transform: "rotate(0deg) translateY(0) scale(1)", opacity: '0'},
				"20%": { transform: "rotate(5deg) translateY(-4px) scale(1.05)", opacity: '1'},
				"50%": { transform: "rotate(-8deg) translateY(2px) scale(0.95)", opacity: '1'},
				"80%": { transform: "rotate(4deg) translateY(-1px) scale(1.02)", opacity: '0.80'},
			},
			"pierce": {
				'0%': { transform: 'translateX(20px) translateY(-50%) scaleY(0.5) rotate(-20deg)', opacity: '0.2' },
				'15%': { transform: 'translateX(-2px) translateY(10%) scaleY(1.0) rotate(5deg)', opacity: '1' },
				'70%': { transform: 'translateX(2px) translateY(-1%) scaleY(0.98) rotate(-5deg)'},
				'100%': { transform: 'translateY(0) scaleY(1) rotate(8deg)'},
			}
		},
		animation: {
			 "caret-blink": "caret-blink 1.25s ease-out infinite",
			 "wiggle": "wiggle 5s ease-in-out infinite",
			 "pierce": "pierce 5s ease-in-out"
		},
  		fontFamily: {
  			title: [
  				'var(--font-lora)'
  			],
  			body: [
  				'var(--font-merriweather)'
  			],
  			jaibhim: [
  				'var(--font-vesper_libre)'
  			],
  			rajdhani: [
  				'var(--font-rajdhani)'
  			],
  			handwriting: [
  				'var(--font-reenie-beanie)'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

export default config 