#!/bin/bash

rm -rf vdesk/envd/__pycache__
rm -rf vdesk/envd/filesystem/__pycache__
rm -rf vdesk/envd/process/__pycache__

sed -i.bak 's/from\ process\ import/from vdesk.envd.process import/g' vdesk/envd/process/* vdesk/envd/filesystem/*
sed -i.bak 's/from\ filesystem\ import/from vdesk.envd.filesystem import/g' vdesk/envd/process/* vdesk/envd/filesystem/*

rm -f vdesk/envd/process/*.bak
rm -f vdesk/envd/filesystem/*.bak
