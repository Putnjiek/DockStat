#!/bin/bash

if [[ -z "${DEFAULT_THEME}" ]]; then
    DEFAULT_THEME="dracula"
fi

echo "============ DockStat ============"
echo "API_URL:       ${API_URL}"
echo "DEFAULT_THEME: ${DEFAULT_THEME}"
echo "SECRET:        ${SECRET}"
echo "============ DockStat ============"

echo "
{
    \"API_URL\": \"${API_URL}\",
    \"DEFAULT_THEME\": \"${DEFAULT_THEME}\",
    \"SECRET\": \"${SECRET}\"
}
" > /build/public/config.json

exec serve -s build