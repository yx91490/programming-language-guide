import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/lang-guide/",
  lang: "zh-CN",
  title: "编程语言入门指南",
  description: "编程语言入门指南",

  bundler: viteBundler(),

  theme: hopeTheme({
    darkmode: "switch",
    navbar: [
      { text: "首页", link: "/", icon: "home" },
    ],
    markdown: {
      codeTabs: true,
    },
    sidebar: {
      "/": "structure",
    },
  }),
});
