import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue' <% if (hasEslint) { %>
import eslint from 'vite-plugin-eslint' <% } %><% if (hasMock) { %>
import { viteMockServe } from 'vite-plugin-mock'<% } %>
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'

// 按需导入 andtdv 样式

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, 'env')
  return {
    server: {
      proxy: {
        // 配置nginx转发
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    resolve: {
      // 忽略后缀名的配置选项, vite建议引入时不要忽略.vue扩展名
      extensions: ['.js', '.json', '.ts'],
      // 配置路径别名
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    plugins: [
      vue(), <% if (hasEslint) { %>
      eslint(),<% } %> <% if (hasMock) { %>
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve' && env.VITE_MOCK === 'LOCAL',
      }),<% } %>
      Components({
        dirs: ['src/components'],
        resolvers: [AntDesignVueResolver({
          resolveIcons: true,
        })],
        dts: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
    ],
    css: {
      preprocessorOptions: {
        <% if (cssPreprocessor === 'less') { %>
        less: {
          javascriptEnabled: true,
        },
        <% } %>
      },
    },
    base: env.VITE_BASE_URL,
    envDir: resolve(__dirname, 'env'),
  }
})
