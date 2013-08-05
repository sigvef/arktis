.PHONY: deploy
deploy:
	ssh -t arkt.is 'cd /home/prods/arktis && git pull && git submodule init && git submodule update'
