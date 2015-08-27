.PHONY: deploy
deploy:
	ssh -t arkt.is 'cd /home/prods/arktis && git pull && git submodule init && git submodule update'

.PHONY: server
serve:
	bash -c 'php -S 0.0.0.0:8000 -c <(echo "short_open_tag=On")'
