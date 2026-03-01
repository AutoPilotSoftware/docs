// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightClientMermaid from '@pasqal-io/starlight-client-mermaid';

export default defineConfig({
	site: 'https://autopilotsoftware.github.io',
	base: '/docs',
	integrations: [
		starlight({
			title: 'AutoPilot',
			logo: { src: './src/assets/auto_pilot_logo.png' },
			plugins: [starlightClientMermaid()],
			defaultLocale: 'root',
			locales: {
				root: { label: 'Русский', lang: 'ru' },
				en: { label: 'English' },
				ua: { label: 'Українська', lang: 'uk' },
			},
			sidebar: [
				{ label: 'FAQ', slug: 'faq' },
				{ label: 'NVS Upload FAQ', slug: 'nvs-faq' },
				{ label: 'Bybit AutoPilot', slug: 'bybit-autopilot' },
				{ label: 'MEXC AutoPilot', slug: 'mexc-autopilot' },
				{ label: 'Bitget AutoPilot', slug: 'bitget-autopilot' },
			],
		}),
	],
});
