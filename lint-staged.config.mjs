/**
 * Windows caps command lines at ~8 KB, so large commits run the tools project-wide
 * instead of passing every staged path as an argument.
 */
const MAX_FILES = 30;
const quote = (files) => files.map((f) => `"${f}"`).join(" ");

const config = {
  "*.{ts,tsx,mjs}": (files) =>
    files.length > MAX_FILES
      ? ["eslint --fix --max-warnings=0 .", "prettier --write ."]
      : [`eslint --fix --max-warnings=0 ${quote(files)}`, `prettier --write ${quote(files)}`],
  "*.{css,json,md,mdx,yml,yaml}": (files) =>
    files.length > MAX_FILES ? "prettier --write ." : `prettier --write ${quote(files)}`,
};

export default config;
