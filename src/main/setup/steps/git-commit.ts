import execa from "execa"
import { isGitInitialized } from "../../helpers/is-git-initialized"
import { logWarning } from "../../logging"
import { Step } from "../step"

export const gitCommitStep: Step = {
  description: "adding initial commit",

  shouldRun: async () => {
    if (!(await isGitInitialized())) {
      logWarning("Skipping initial commit, as Git was not initialized.")
      return false
    }
    return true
  },

  didRun: false,

  run: async () => {
    // Create Next App adds an initial commit. This is overridden using --amend below.
    await execa("git", ["add", "."])
    await execa("git", [
      "commit",
      "--amend",
      "-m",
      "Initial commit from Create Next Stack",
    ])
  },
}
