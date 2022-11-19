declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MAPBOX_TOKEN?: string;
    }
  }
}

export {};
