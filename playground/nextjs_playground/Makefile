COMPOSE:=docker-compose.yml

.PHONY: dev
dev: ${COMPOSE} down
	docker compose up -d
	docker ps

.PHONY: shell
shell: ${COMPOSE}
	docker compose exec mongo bash

# TODO: db connetion failed
.PHONY: db
db: ${COMPOSE}
	docker compose exec mongo mongosh -u root -p password --authenticationDatabase mydb

.PHONY: up
up: ${COMPOSE} down
	docker compose up -d
	docker ps

.PHONY: down
down: ${COMPOSE}
	docker compose down >/dev/null 2>&1

.PHONY: build
build: ${COMPOSE} down
	docker compose up --build -d
