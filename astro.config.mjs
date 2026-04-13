// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightClientMermaid from '@pasqal-io/starlight-client-mermaid';

export default defineConfig({
	site: 'https://autopilotsoftware.github.io',
	base: '/docs',
	redirects: {
		// Old flat URLs → new section folders (preserve bookmarks & external links)
		'/faq': '/getting-started/faq',
		'/bybit-autopilot': '/exchanges/bybit-autopilot',
		'/mexc-autopilot': '/exchanges/mexc-autopilot',
		'/bitget-autopilot': '/exchanges/bitget-autopilot',
		'/autopilot-kyc-subscription': '/kyc/autopilot-kyc-subscription',
		'/autopilot-kyc-tos': '/kyc/autopilot-kyc-tos',
		'/nvs-faq': '/kyc/nvs-faq',
		'/pilot-faq': '/kyc/pilot-faq',
		'/sellers-guide': '/kyc/sellers-guide',
		'/macos-launch': '/getting-started/macos-launch',
		'/privacy-policy-autopilot-link-generator': '/legal/privacy-policy-autopilot-link-generator',
		// EN locale
		'/en/faq': '/en/getting-started/faq',
		'/en/bybit-autopilot': '/en/exchanges/bybit-autopilot',
		'/en/mexc-autopilot': '/en/exchanges/mexc-autopilot',
		'/en/bitget-autopilot': '/en/exchanges/bitget-autopilot',
		'/en/autopilot-kyc-subscription': '/en/kyc/autopilot-kyc-subscription',
		'/en/autopilot-kyc-tos': '/en/kyc/autopilot-kyc-tos',
		'/en/nvs-faq': '/en/kyc/nvs-faq',
		'/en/pilot-faq': '/en/kyc/pilot-faq',
		'/en/macos-launch': '/en/getting-started/macos-launch',
		// UA locale
		'/ua/faq': '/ua/getting-started/faq',
		'/ua/bybit-autopilot': '/ua/exchanges/bybit-autopilot',
		'/ua/mexc-autopilot': '/ua/exchanges/mexc-autopilot',
		'/ua/bitget-autopilot': '/ua/exchanges/bitget-autopilot',
		'/ua/autopilot-kyc-subscription': '/ua/kyc/autopilot-kyc-subscription',
		'/ua/autopilot-kyc-tos': '/ua/kyc/autopilot-kyc-tos',
		'/ua/nvs-faq': '/ua/kyc/nvs-faq',
		'/ua/pilot-faq': '/ua/kyc/pilot-faq',
		'/ua/macos-launch': '/ua/getting-started/macos-launch',
	},
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
