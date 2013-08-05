.PHONY: deploy
deploy:
	ssh -t arkt.is 'cd /home/prods/arktis && git pull'
