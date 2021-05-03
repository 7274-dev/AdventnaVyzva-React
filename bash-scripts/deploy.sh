#!/bin/bash

git reset --hard
git pull origin master

bash setup-dependencies.sh
bash run.sh
