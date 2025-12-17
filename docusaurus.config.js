// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI Book',
  tagline: 'Built by Afsheen Afridi',
  favicon: 'img/favicon.ico',

  url: 'http://localhost:3000',
  baseUrl: '/',

  organizationName: 'AfsheenAfridi',
  projectName: 'physical-ai-book',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

themeConfig: {
  navbar: {
    title: 'Physical AI',
    items: [
      { to: '/', label: 'Home', position: 'left' },
      { to: '/tutorial', label: 'Tutorial', position: 'left' },
      {
        type: 'docSidebar',
        sidebarId: 'tutorialSidebar',
        label: 'Chapters',
        position: 'left',
      },
      { to: '/chat', label: 'Chatbot', position: 'left' },
      { to: '/signup', label: 'Signup', position: 'right' },
      { to: '/login', label: 'Login', position: 'right' },
      { to: '/profile', label: 'Profile', position: 'right' },
    ],
  },

  footer: {
    style: 'dark',
    links: [
      {
        title: 'Book',
        items: [
          { label: 'Tutorial', to: '/tutorial' },
          { label: 'Chapters', to: '/docs' },
        ],
      },
      {
        title: 'AI',
        items: [
          { label: 'Chatbot', to: '/chat' },
          { label: 'RAG System', to: '#' },
        ],
      },
      {
        title: 'More',
        items: [
          { label: 'Blog', to: '#' },
          {
            label: 'GitHub',
            href: 'https://github.com/AfsheenAfridi1',
          },
        ],
      },
    ],
    copyright:
      `© ${new Date().getFullYear()} Physical AI Book — Built by Afsheen Afridi`,
  },

  prism: {
    theme: prismThemes.github,
    darkTheme: prismThemes.dracula,
  },
},
};

module.exports = config;
