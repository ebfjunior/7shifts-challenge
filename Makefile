start:
	docker-compose up

clean:
	docker-compose run 7shifts-client rm -rf node_modules
	docker-compose run 7shifts-server rm -rf node_modules
	docker-compose down

install:
	docker-compose build
	docker-compose run client npm install
	docker-compose run server npm install
	docker-compose down

test-unit:
	docker-compose run 7shifts-server npm run test-unit

test-system:
	docker-compose up -d
	docker-compose run 7shifts-server npm run test-system
