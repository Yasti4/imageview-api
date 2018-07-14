#!/bin/sh

cd "$(dirname "$0")/.."
COMPOSE="docker-compose"
SCRIPT=""

for i in "$@"
do
case $i in
    *)
    if [ $1 != $i ]
    then
        SCRIPT=$SCRIPT" "$i
    fi
    ;;
esac
done

if [ $# -gt 0 ]; then
    if [ "$1" == "up" ]; then
        $COMPOSE up -d
    elif [ "$1" == "reload" ] || [ "$1" == "restart" ]; then
        $COMPOSE down && $COMPOSE up -d
    elif [ "$1" == "rebuild" ]; then
        shift 1
        $COMPOSE build --no-cache $SCRIPT
    elif [ "$1" == "npm" ]; then
        shift 1
        EXEC_CMD="npm $SCRIPT"
        $COMPOSE exec node /bin/sh -c "$EXEC_CMD"
    elif [ "$1" == "terminal" ]; then
        shift 1
        $COMPOSE exec node /bin/sh
    else
        $COMPOSE $@
    fi
else
    $COMPOSE ps
fi
