#!/bin/bash

if [[ -z "${DEFAULT_THEME}" ]]; then
    DEFAULT_THEME="dracula"
fi

echo "============ DockStat ============"
echo "API_URL:       ${API_URL}"
echo "DEFAULT_THEME: ${DEFAULT_THEME}"
echo "SECRET:        ${SECRET}"
echo "============ DockStat ============"

export REACT_APP_API_URL=${API_URL}
export REACT_APP_DEFAULT_THEME=${DEFAULT_THEME}
export REACT_APP_SECRET=${SECRET}

exec serve -s build