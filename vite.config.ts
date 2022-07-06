import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://shop-2064130-1312774387.ap-shanghai.run.tcloudbase.com/api/private/v1/', //你要跨域访问的网址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径把路径变成空字符
      },
    },
  },
});
