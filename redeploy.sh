#!/bin/bash
cd project-pr-heroes
git fetch
git reset origin/main --hard
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build
systemctl daemon-reload
systemctl restart myportfolio