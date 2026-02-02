import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import reactHooks from "eslint-plugin-react-hooks"
import unusedImports from "eslint-plugin-unused-imports"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  
  {
    plugins: {
      "react-hooks": reactHooks,
      "unused-imports": unusedImports
    },
    rules: {
      /**
       * =========================
       * UNUSED IMPORTS & VARIABLES
       * =========================
       */

      // Warning jika ada import yang tidak dipakai
      "unused-imports/no-unused-imports": "warn",

      // Variable tidak terpakai (TypeScript-aware)
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_"
        }
      ],

      /**
       * =========================
       * REACT HOOKS
       * =========================
       */

      // Wajib patuh rules of hooks
      "react-hooks/rules-of-hooks": "error",

      // Dependency useEffect/useCallback/useMemo harus benar
      "react-hooks/exhaustive-deps": "warn"
    }
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts"
  ])
])

export default eslintConfig
