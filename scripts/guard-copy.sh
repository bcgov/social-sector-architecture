#!/bin/bash
# Claude Code PreToolUse guard for the site copy. Wired up in ../.claude/settings.json.
# The author owns the wording; this stops Claude from overwriting it.
#   Write to an existing copy file          -> deny (use Edit, which changes only what it names)
#   Edit a data file with uncommitted edits -> ask (they may be the author's unsaved work)
#   Running copy:update or copy:save        -> ask (only the author signs off on wording)

input=$(cat)
tool=$(jq -r '.tool_name // empty' <<<"$input")
site="$(cd "$(dirname "$0")/.." && pwd)"

decide() {
  jq -n --arg d "$1" --arg r "$2" \
    '{hookSpecificOutput: {hookEventName: "PreToolUse", permissionDecision: $d, permissionDecisionReason: $r}}'
  exit 0
}

case "$tool" in
  Write|Edit)
    f=$(jq -r '.tool_input.file_path // empty' <<<"$input")
    case "$f" in
      "$site"/src/lib/data/*|"$site"/src/*.svelte|"$site"/src/*/*.svelte|"$site"/src/*/*/*.svelte|"$site"/src/*/*/*/*.svelte) ;;
      *) exit 0 ;;
    esac
    if [ "$tool" = Write ] && [ -e "$f" ]; then
      decide deny "This file holds the author's site copy. Write would replace the whole file; use Edit to change only what you mean to."
    fi
    case "$f" in
      "$site"/src/lib/data/*)
        if ! git -C "$site" diff --quiet -- "$f" 2>/dev/null; then
          decide ask "$(basename "$f") has uncommitted changes, which may be the author's copy edits. Allow Claude to edit it anyway?"
        fi
        ;;
    esac
    ;;
  Bash)
    cmd=$(jq -r '.tool_input.command // empty' <<<"$input")
    if grep -Eq 'copy:(update|save)|copy-lock\.js +(update|save)' <<<"$cmd"; then
      decide ask "This rewrites copy.lock.txt, which accepts the current wording as approved. Only allow it if you asked for this wording change."
    fi
    ;;
esac
exit 0
