LIBRARY=bessel

$(LIBRARY).js: bessel.md
	@[ -e node_modules/voc ] && true || npm install voc
	node_modules/.bin/voc $^ > $@

test mocha:
	mocha -R spec
