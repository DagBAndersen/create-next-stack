import { throwError } from "../../error-handling"
import { writeJsonFile } from "../../helpers/write-json-file"
import { Step } from "../step"
import { createNextAppStep } from "./create-next-app"

export const addBaseBabelConfigStep: Step = {
  dependencies: [createNextAppStep],

  shouldRun: function (this) {
    return true
  },

  run: async function (this) {
    this.log("Adding custom Babel configuration...")

    // The base Babel config is ready for custom preset configurations to be added onto the `next/babel` preset as per the Next.js docs: https://nextjs.org/docs/advanced-features/customizing-babel-config
    const baseBabelConfig = {
      presets: [["next/babel", {}]],
      plugins: [],
    }

    try {
      await writeJsonFile(".babelrc", baseBabelConfig)
    } catch (error) {
      throwError.call(
        this,
        "An error occurred while adding custom Babel configuration.",
        error
      )
    }
  },
}
