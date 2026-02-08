import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export const baseConfig = defineConfig([
  prettier,
  {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. React, Next, 외부 라이브러리
            ["^react", "^next", "^@?\\w"],
            // 2. 내부 절대경로
            [
              "^@/app",
              "^@/database",
              "^@/services",
              "^@/lib",
              "^@/hooks",
              "^@/components/ui",
              "^@/components/common",
              "^@/",
            ],
            // 3. 상대경로
            ["^\\."],
            // 4. 스타일 파일
            ["^.+\\.css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  globalIgnores([
    "**/node_modules/**",
    "**/.next/**",
    "**/out/**",
    "**/build/**",
  ]),
]);
