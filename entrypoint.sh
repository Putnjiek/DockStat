#!/bin/bash

if [[ -z "${DEFAULT_THEME}" ]]; then
    DEFAULT_THEME="dracula"
fi

if [[ ! -f /app/build/config.json ]]; then
    touch /app/build/config.json
else
    rm touch /app/build/config.json
    touch touch /app/build/config.json
fi

echo "============ DockStat ============"
echo "API_URL:       ${API_URL}"
echo "DEFAULT_THEME: ${DEFAULT_THEME}"
echo "SECRET:        ${SECRET}"
echo "============ DockStat ============"

echo "
{
    \"API_URL\": ${API_URL},
    \"DEFAULT_THEME\": ${DEFAULT_THEME},
    \"SECRET\": ${SECRET}
}
" > /app/build/config.json

exec serve -s build
