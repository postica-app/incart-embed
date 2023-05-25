/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_PURCHASE_URL: string
    readonly VITE_POSTGREST_URL: string
    readonly VITE_POSTGREST_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
