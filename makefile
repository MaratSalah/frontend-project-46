install:
	npm ci
	install-deps npx simple-git-hooks

gendiff:
	node src/gendiff.js

publish:
	npm publish --dry-run

lint: 
	npx eslint .

tests:
	NODE_OPTIONS=--experimental-vm-modules npx jest
	