#!/bin/bash

DT=$(date +%Y-%m-%d-%H-%M)
DIR=.bak
FILE="$DIR/$DT.tgz"
FILE_EXCLUDE=exclude.tag
mkdir $DIR -p
touch .bak/$FILE_EXCLUDE
touch .removed//$FILE_EXCLUDE
touch node_modules/$FILE_EXCLUDE
touch packages/app-lib/node_modules/$FILE_EXCLUDE
touch packages/app/node_modules/$FILE_EXCLUDE
touch .oldnestjs9wayproject/$FILE_EXCLUDE

tar -zcvf $FILE \
	--exclude-tag-all=$FILE_EXCLUDE \
	--exclude='FILE|DIR' \
	.
