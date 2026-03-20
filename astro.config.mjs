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
					label: 'Getting Started',
					items: [
						{ label: 'FAQ', slug: 'faq', badge: { text: 'Guide', variant: 'tip' } },
						{ label: 'NVS Upload FAQ', slug: 'nvs-faq' },
					],
				},
				{
					label: 'Exchange Automation',
					items: [
						{ label: 'Bybit AutoPilot', slug: 'bybit-autopilot' },
						{ label: 'MEXC AutoPilot', slug: 'mexc-autopilot' },
						{ label: 'Bitget AutoPilot', slug: 'bitget-autopilot', badge: { text: 'New', variant: 'success' } },
					],
				},
				{
					label: 'KYC Platform',
					items: [
						{ label: 'KYC Subscription', slug: 'autopilot-kyc-subscription' },
						{ label: 'NVS Pilot Guide', slug: 'pilot-faq' },
						{ label: 'Terms of Service', slug: 'autopilot-kyc-tos' },
					],
				},
				{
					label: 'For Sellers',
					items: [
						{ label: 'Seller Guide', slug: 'sellers-guide' },
					],
				},
			],
		}),
	],
});
