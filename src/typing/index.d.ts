export {};

declare global {
  interface Window {
    renderPage: (name: string) => void;
  }
}
