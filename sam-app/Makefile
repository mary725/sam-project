build-getBookByIdFunction:
	npm install
# workaround https://github.com/aws/aws-sam-cli/issues/2565
	npm rebuild
	npm run lint
	npm run fast-compile
#	npm run fast-test
	npm prune --production
ifeq ($(OS),Windows_NT)
	Xcopy .\package.json $(ARTIFACTS_DIR)
	Xcopy .\package-lock.json $(ARTIFACTS_DIR)
	Xcopy /E /i .\dist\get-book-by-id $(ARTIFACTS_DIR)\dist\get-book-by-id
	Xcopy /E /i .\node_modules $(ARTIFACTS_DIR)\node_modules
else
# TO DO
	cp -R * $(ARTIFACTS_DIR)
endif

#build-putBookFunction:
#	npm install
## workaround https://github.com/aws/aws-sam-cli/issues/2565
#	npm rebuild
#	npm run lint
#	npm run fast-compile
#	npm run fast-test
#	npm prune --production
#ifeq ($(OS),Windows_NT)
#	Xcopy /E * $(ARTIFACTS_DIR)
#else
#	cp -R * $(ARTIFACTS_DIR)
#endif
