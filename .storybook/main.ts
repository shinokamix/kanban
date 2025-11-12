import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
    stories: ['../**/*.stories.@(ts|tsx|mdx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
}
export default config
