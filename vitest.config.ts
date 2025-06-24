import { defaultExclude, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...defaultExclude, "templates"],
    include: ['__tests__/*.js']
  },
});
