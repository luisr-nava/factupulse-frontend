import type { NextConfig } from "next";
import { Configuration } from "webpack";

const nextConfig: NextConfig = {
  transpilePackages: [
    "antd",
    "@ant-design/cssinjs",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-menu",
    "rc-component",
    "rc-table",
    "rc-select",
    "rc-tree",
    "rc-input",
    "rc-textarea",
    "rc-cascader",
    "rc-checkbox",
    "rc-collapse",
    "rc-dialog",
    "rc-dropdown",
    "rc-form",
    "rc-tooltip",
    "rc-upload",
    "rc-progress",
    "rc-rate",
    "rc-slider",
    "rc-steps",
    "rc-switch",
    "rc-tabs",
    "rc-time-picker",
    "rc-tree-select",
    "rc-upload",
    "rc-mentions",
    "rc-calendar",
    "rc-animate",
    "rc-overflow",
    "@ant-design/icons",
    "@ant-design/icons-svg",
  ],
  // experimental: {
  //   esmExternals: "loose", // Permite manejar mejor los módulos ES
  // },
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    // Solución definitiva para módulos ES
    config!.module!.rules!.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });

    // Alias críticos
    config.resolve!.alias = {
      ...config.resolve!.alias,
      "rc-util/es": "rc-util/lib",
      "rc-pagination/es": "rc-pagination/lib",
      "rc-picker/es": "rc-picker/lib",
      "antd/es": "antd/lib",
      "@ant-design/icons-svg/es": "@ant-design/icons-svg/lib",
      "@ant-design/icons/es": "@ant-design/icons/lib",
      // "antd/es": "antd/lib",
      // "@ant-design/icons/es": "@ant-design/icons/lib",
      // "rc-notification/es": "rc-notification/lib",
      "rc-menu/es": "rc-menu/lib",
      "rc-component/es": "rc-component/lib",
      "rc-table/es": "rc-table/lib",
      "rc-select/es": "rc-select/lib",
      "rc-tree/es": "rc-tree/lib",
      "rc-input/es": "rc-input/lib",
      "rc-textarea/es": "rc-textarea/lib",
      "rc-cascader/es": "rc-cascader/lib",
      "rc-calendar/es": "rc-calendar/lib",
      "rc-time-picker/es": "rc-time-picker/lib",
      "rc-tree-select/es": "rc-tree-select/lib",
      "rc-mentions/es": "rc-mentions/lib",
      "rc-upload/es": "rc-upload/lib",
      "rc-tooltip/es": "rc-tooltip/lib",
      "rc-collapse/es": "rc-collapse/lib",
      "rc-switch/es": "rc-switch/lib",
      "rc-tabs/es": "rc-tabs/lib",
      "rc-slider/es": "rc-slider/lib",
      "rc-steps/es": "rc-steps/lib",
      "rc-rate/es": "rc-rate/lib",
      "rc-progress/es": "rc-progress/lib",
      "rc-dropdown/es": "rc-dropdown/lib",
      "rc-dialog/es": "rc-dialog/lib",
      "rc-overflow/es": "rc-overflow/lib",
      "rc-form/es": "rc-form/lib",
    };

    if (!isServer) {
      config.resolve!.fallback = { fs: false };
    }

    return config;
  },
};

module.exports = nextConfig;

