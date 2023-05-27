/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_PURCHASE_URL: string
    readonly VITE_API_URL: strin
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
