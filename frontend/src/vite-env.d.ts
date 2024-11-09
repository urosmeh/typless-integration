/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly API_ROOT: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
