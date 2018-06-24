start:
	docker-compose up

clean:
	docker-compose run server rm -rf node_modules
	docker-compose down

install:
	docker-compose build
	docker-compose run server npm install
	docker-compose down

test-unit:
	docker-compose run server npm run test-unit