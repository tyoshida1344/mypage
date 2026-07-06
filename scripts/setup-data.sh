#!/bin/sh
# Netlify環境変数 SITE_DATA (Base64エンコード済みJSON) からsite.jsonを生成する。
# SITE_DATA が未設定の場合は site.example.json をフォールバックとして使用する。

DATA_FILE="data/site.json"

if [ -n "$SITE_DATA" ]; then
  echo "$SITE_DATA" | base64 -d > "$DATA_FILE" 2>/dev/null || echo "$SITE_DATA" | base64 -D > "$DATA_FILE"
  echo "[setup-data] $DATA_FILE generated from SITE_DATA env var."
elif [ ! -f "$DATA_FILE" ]; then
  cp data/site.example.json "$DATA_FILE"
  echo "[setup-data] SITE_DATA not set, using site.example.json as fallback."
else
  echo "[setup-data] $DATA_FILE already exists, skipping."
fi
