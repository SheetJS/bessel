LIBRARY=bessel

$(LIBRARY).js: bessel.md
	node_modules/.bin/voc $^ > $@

test mocha:
	mocha -R spec
