# README

## Build and test 

### Build
docker build -t frankang/twitter-feed .

### Test
Docker run. Set container environment variables on command-line
```
docker run -e [Set your AWS_* environment variables here] -t twitter-feed
```

Or, set container environment variables in a docker_creds file. 
```
docker run --env-file ~/.aws/docker_credentials -t twitter-feed
```
## Test API GW endpoint 

### Send test POST to API GW

curl -vv -H "Content-Type: application/json" -X POST -d '{ "text": "the xphone is a decent product #xoyxoz" }' $APIURL

curl -vv -H "Content-Type: application/json" -X POST -d '{ "text": "2016 Ford Mustang Coupe." }' $APIURL

curl -vv -H "Content-Type: application/json" -X POST -d '{ "text": "这天是我必须开始运通减胖以及注意健康饮食。2016 Ford Mustang Ecoboost Coupe." }' $APIURL

curl -vv -H "Content-Type: application/json" -X POST -d '{ "text": "foobar #xoyxoz" }' $APIURL
