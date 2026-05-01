// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightClientMermaid from '@pasqal-io/starlight-client-mermaid';
import slugifyLib from '@sindresorhus/slugify';
import rehypeSlugCustomId from 'rehype-slug-custom-id';
import { visit } from 'unist-util-visit';

const CYRILLIC_RE = /[Ѐ-ӿ]/;

// Post-process: replace any heading ID containing Cyrillic chars with
// transliterated Latin slug. Skips IDs already in Latin (custom {#id} syntax,
// English/Ukrainian-Latin headings).
function rehypeTransliterateHeadingIds() {
	const seen = new Set();
	return (tree) => {
		seen.clear();
		visit(tree, 'element', (node) => {
			if (!/^h[1-6]$/.test(node.tagName)) return;
			const id = node.properties?.id;
			if (typeof id !== 'string' || !CYRILLIC_RE.test(id)) return;

			let slug = slugifyLib(id, {
				customReplacements: [
					['AutoPilot', 'autopilot'],
					['Bybit', 'bybit'],
					['MEXC', 'mexc'],
					['Bitget', 'bitget'],
					['BitGP', 'bitgp'],
					['OKX', 'okx'],
				],
			});
			if (!slug) return;

			let unique = slug;
			let n = 1;
			while (seen.has(unique)) unique = `${slug}-${n++}`;
			seen.add(unique);
			node.properties.id = unique;
		});
	};
}

export default defineConfig({
	site: 'https://autopilotsoftware.github.io',
	base: '/docs',
	redirects: {
		// Old flat URLs → new section folders (preserve bookmarks & external links)
		'/faq': '/docs/getting-started/faq',
		'/bybit-autopilot': '/docs/exchanges/bybit-autopilot',
		'/mexc-autopilot': '/docs/exchanges/mexc-autopilot',
		'/bitget-autopilot': '/docs/exchanges/bitget-autopilot',
		'/autopilot-kyc-subscription': '/docs/kyc/autopilot-kyc-subscription',
		'/autopilot-kyc-tos': '/docs/kyc/autopilot-kyc-tos',
		'/nvs-faq': '/docs/kyc/nvs-faq',
		'/pilot-faq': '/docs/kyc/pilot-faq',
		'/sellers-guide': '/docs/kyc/sellers-guide',
		'/macos-launch': '/docs/getting-started/macos-launch',
		'/privacy-policy-autopilot-link-generator': '/docs/legal/privacy-policy-autopilot-link-generator',
		// EN locale
		'/en/faq': '/docs/en/getting-started/faq',
		'/en/bybit-autopilot': '/docs/en/exchanges/bybit-autopilot',
		'/en/mexc-autopilot': '/docs/en/exchanges/mexc-autopilot',
		'/en/bitget-autopilot': '/docs/en/exchanges/bitget-autopilot',
		'/en/autopilot-kyc-subscription': '/docs/en/kyc/autopilot-kyc-subscription',
		'/en/autopilot-kyc-tos': '/docs/en/kyc/autopilot-kyc-tos',
		'/en/nvs-faq': '/docs/en/kyc/nvs-faq',
		'/en/pilot-faq': '/docs/en/kyc/pilot-faq',
		'/en/macos-launch': '/docs/en/getting-started/macos-launch',
		// UA locale
		'/ua/faq': '/docs/ua/getting-started/faq',
		'/ua/bybit-autopilot': '/docs/ua/exchanges/bybit-autopilot',
		'/ua/mexc-autopilot': '/docs/ua/exchanges/mexc-autopilot',
		'/ua/bitget-autopilot': '/docs/ua/exchanges/bitget-autopilot',
		'/ua/autopilot-kyc-subscription': '/docs/ua/kyc/autopilot-kyc-subscription',
		'/ua/autopilot-kyc-tos': '/docs/ua/kyc/autopilot-kyc-tos',
		'/ua/nvs-faq': '/docs/ua/kyc/nvs-faq',
		'/ua/pilot-faq': '/docs/ua/kyc/pilot-faq',
		'/ua/macos-launch': '/docs/ua/getting-started/macos-launch',
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
			],
		}),
	],
	markdown: {
		rehypePlugins: [
			// 1. Honor explicit {#custom-id} syntax in markdown headings.
			[rehypeSlugCustomId, { enableCustomId: true }],
			// 2. Post-process: transliterate any Cyrillic heading IDs
			//    that Starlight's default slugger left as-is.
			rehypeTransliterateHeadingIds,
		],
	},
});
