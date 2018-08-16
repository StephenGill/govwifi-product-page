build:
	docker-compose build

serve: build
	docker-compose run app bundle exec middleman server

deploy: build
	docker-compose run app sh -c "cf login -u ${CF_USER} -p ${CF_PASS} -a https://api.cloud.service.gov.uk -s production && cf push govwifi-product-page"
	$(MAKE) stop

stop:
	docker-compose kill
	docker-compose rm -f

.PHONY: build deploy serve stop