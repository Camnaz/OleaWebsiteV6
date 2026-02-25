#!/bin/bash
echo "Killing any process on port 3000..."
lsof -t -i:3000 | xargs kill -9 2>/dev/null || true

echo "Removing .next cache..."
rm -rf .next

echo "Starting Next.js dev server..."
npm run dev
