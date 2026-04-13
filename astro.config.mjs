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
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'script',
					attrs: {
						defer: true,
						src: 'https://static.cloudflareinsights.com/beacon.min.js',
						'data-cf-beacon': '{"token": "d98cb2456dd9448bb66e095a800bb391"}',
					},
				},
			],
			defaultLocale: 'root',
			locales: {
				root: { label: 'Русский', lang: 'ru' },
				en: { label: 'English' },
				ua: { label: 'Українська', lang: 'uk' },
			},
			sidebar: [
				{
					label: 'Начало работы',
					translations: { en: 'Getting Started', uk: 'Початок роботи' },
					autogenerate: { directory: 'getting-started' },
				},
				{
					label: 'Биржи',
					translations: { en: 'Exchanges', uk: 'Біржі' },
					autogenerate: { directory: 'exchanges' },
				},
				{
					label: 'KYC Платформа',
					translations: { en: 'KYC Platform', uk: 'KYC Платформа' },
					autogenerate: { directory: 'kyc' },
				},
				{
					label: 'Юридическое',
					translations: { en: 'Legal', uk: 'Юридичне' },
					autogenerate: { directory: 'legal' },
				},
			],
		}),
	],
});
