# Makefile

install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

fix:
	npx eslint . --fix

start:
	npm start

build:
	npm run build
