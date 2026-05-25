import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'ai-workflow-automation': resolve(__dirname, 'ai-workflow-automation/index.html'),
        'business-process-automation-services': resolve(__dirname, 'business-process-automation-services/index.html'),
        'small-business-automation-services': resolve(__dirname, 'small-business-automation-services/index.html'),
        'chatgpt-automation-for-business': resolve(__dirname, 'chatgpt-automation-for-business/index.html'),
        'crm-workflow-automation': resolve(__dirname, 'crm-workflow-automation/index.html'),
        'no-code-automation-services': resolve(__dirname, 'no-code-automation-services/index.html'),
        'ai-customer-support-automation': resolve(__dirname, 'ai-customer-support-automation/index.html'),
        'data-integration-services': resolve(__dirname, 'data-integration-services/index.html'),
      }
    }
  }
})
