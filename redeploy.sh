#!/bin/bash
cd messenger-app
git fetch
git reset origin/master --hard
sudo docker compose -f docker-compose.yml down
sudo docker compose -f docker-compose.yml up -d --build
sudo systemctl daemon-reload
sudo systemctl restart app
