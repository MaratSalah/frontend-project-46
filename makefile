install: install-deps
	npx simple-git-hooks
	
install-deps:
	npm ci

gendiff:
	node src/gendiff.js

publish:
	npm publish --dry-run

lint: 
	npx eslint .

test:
	npx -n --experimental-vm-modules jest
	
test-coverage: 
	npx jest --coverage
