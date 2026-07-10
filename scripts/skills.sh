#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

usage() {
  cat <<EOF
Usage:
  skills.sh list
  skills.sh find <query>
  skills.sh add <repo> --skill <name>
EOF
}

cmd="${1:-}"
shift || true

case "$cmd" in
  list)
    cd "$ROOT" && npx skills ls
    ;;
  find)
    query="${1:-}"
    cd "$ROOT" && npx skills find "$query"
    ;;
  add)
    cd "$ROOT" && npx skills add "$@"
    ;;
  *)
    usage
    exit 1
    ;;
esac
