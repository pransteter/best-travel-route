.PHONY: help build up test down

help:
	@grep -E '^[a-zA-Z-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "[32m%-15s[0m %s\n", $$1, $$2}'

build: ## Build docker environment
	docker-compose build

api-server-up: ## Turn on the API server
	docker-compose up -d

test: ## Run all tests
	docker-compose run travel_quotation_app npm run test

down: ## Turn off the docker environment
	docker-compose down -v

style-check: ## Check style errors with ESLint
	docker-compose run travel_quotation_app sh -c './node_modules/.bin/eslint . --ext .js'

style-fix: ## Fix style errors with ESLint
	docker-compose run travel_quotation_app sh -c './node_modules/.bin/eslint . --ext .js --fix'