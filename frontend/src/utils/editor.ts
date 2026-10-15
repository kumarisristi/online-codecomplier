import { EditorFile } from "../types/compiler";

export function countLines(code: string): number {
  return code.split("\n").length;
}

export function isCodeEmpty(code: string): boolean {
  return !code || !code.trim();
}

/**
 * Combine the index.html / styles.css / script.js workspace files into a
 * single self-contained document for the live preview iframe. The local
 * `href="styles.css"` and `src="script.js"` references are swapped for
 * inline <style>/<script> tags since the iframe has no real file system.
 */
export function buildHtmlPreviewDoc(files: EditorFile[]): string {
  const html = files.find((f) => f.name === "index.html")?.content ?? "";
  const css = files.find((f) => f.name === "styles.css")?.content ?? "";
  const js = files.find((f) => f.name === "script.js")?.content ?? "";

  let doc = html
    .replace(/<link[^>]*href=["']styles\.css["'][^>]*>/i, `<style>\n${css}\n</style>`)
    .replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/i, `<script>\n${js}\n<\/script>`);

  if (!/<style>/i.test(doc) && css) {
    doc = doc.replace(/<\/head>/i, `<style>\n${css}\n</style>\n</head>`);
  }
  if (!doc.includes(js) && js) {
    doc = doc.replace(/<\/body>/i, `<script>\n${js}\n<\/script>\n</body>`);
  }

  return doc;
}

/**
 * Wraps a React (JSX) component file + its CSS into a runnable HTML page for
 * the preview iframe, using in-browser Babel to transform JSX — no build
 * step or bundler needed, same idea as the html/css/js preview above.
 */
export function buildReactPreviewDoc(files: EditorFile[]): string {
  const app = files.find((f) => f.name === "App.jsx")?.content ?? "";
  const css = files.find((f) => f.name === "styles.css")?.content ?? "";

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>${css}</style>
  </head>
  <body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
    <script type="text/babel" data-presets="react">
      ${app}
      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
    <\/script>
  </body>
</html>`;
}
