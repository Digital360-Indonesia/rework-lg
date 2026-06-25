#!/bin/bash

# Deploy script parametrik untuk multi-user setup
# Dijalankan oleh syanampro, tapi PM2 jalan sebagai user yang didefine di .deployrc

set -e  # Exit on error

# Load configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SCRIPT_DIR/.deployrc" ]; then
    source "$SCRIPT_DIR/.deployrc"
else
    echo "Error: .deployrc not found!"
    exit 1
fi

# Pindah ke directory project
cd "$SCRIPT_DIR" || exit 1

echo "Fetching latest code from GitHub (as $DEPLOY_USER)..."
# reset --hard (not pull): the build regenerates package-lock.json metadata every run,
# which would otherwise block a plain `git pull`. dist/ is gitignored, so it's untouched.
sudo -u "$DEPLOY_USER" git fetch origin "$DEPLOY_BRANCH"
sudo -u "$DEPLOY_USER" git reset --hard "origin/$DEPLOY_BRANCH"

echo "Installing dependencies (as $DEPLOY_USER)..."
sudo -u "$DEPLOY_USER" npm install

echo "Building Astro site (as $DEPLOY_USER)..."
sudo -u "$DEPLOY_USER" npm run build

echo "Build complete - files ready in dist/ directory"
echo "Repository location: $(pwd)"
echo "Website: https://levelgarment.com"
