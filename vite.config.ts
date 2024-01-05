import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from "vite-plugin-top-level-await";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasm(), topLevelAwait()],
  assetsInclude: ["**/*.tflite", "**/*.wasm"],
  worker: {
    format: 'es',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error 23
    plugins: [wasm(), topLevelAwait()]
  }
})
