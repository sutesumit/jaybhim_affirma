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
				'70%': { transform: 'translateX(2px) translateY(-1%) scaleY(1.0) rotate(-5deg)'},
				'100%': { transform: 'translateY(0) scaleY(1) rotate(8deg)'},
			},
			"brownian": {
				'0%': { 
					transform: 'translateX(0vw) translateY(0vh) rotate(0deg)', 
					opacity: '0.3' 
				},
				'8%': { 
					transform: 'translateX(-8vw) translateY(5vh) rotate(-12deg)', 
					opacity: '0.5' 
				},
				'16%': { 
					transform: 'translateX(-15vw) translateY(-8vh) rotate(8deg)', 
					opacity: '0.7' 
				},
				'24%': { 
					transform: 'translateX(12vw) translateY(-15vh) rotate(-18deg)', 
					opacity: '0.8' 
				},
				'32%': { 
					transform: 'translateX(18vw) translateY(3vh) rotate(15deg)', 
					opacity: '0.9' 
				},
				'40%': { 
					transform: 'translateX(-5vw) translateY(12vh) rotate(-8deg)', 
					opacity: '1' 
				},
				'48%': { 
					transform: 'translateX(8vw) translateY(-18vh) rotate(22deg)', 
					opacity: '0.9' 
				},
				'56%': { 
					transform: 'translateX(-20vw) translateY(-5vh) rotate(-15deg)', 
					opacity: '0.8' 
				},
				'64%': { 
					transform: 'translateX(15vw) translateY(18vh) rotate(25deg)', 
					opacity: '0.7' 
				},
				'72%': { 
					transform: 'translateX(-12vw) translateY(-12vh) rotate(-10deg)', 
					opacity: '0.8' 
				},
				'80%': { 
					transform: 'translateX(5vw) translateY(8vh) rotate(18deg)', 
					opacity: '0.9' 
				},
				'88%': { 
					transform: 'translateX(-18vw) translateY(15vh) rotate(-20deg)', 
					opacity: '0.7' 
				},
				'96%': { 
					transform: 'translateX(10vw) translateY(-8vh) rotate(12deg)', 
					opacity: '0.5' 
				},
				'100%': { 
					transform: 'translateX(0vw) translateY(0vh) rotate(0deg)', 
					opacity: '0.3' 
				}
				}
		},
		animation: {
			 "caret-blink": "caret-blink 1.25s ease-out infinite",
			 "wiggle": "wiggle 5s ease-in-out infinite",
			 "pierce": "pierce 5s ease-in-out",
			 "brownian": "brownian 70s ease-in-out infinite"
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