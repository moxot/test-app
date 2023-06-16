## Description

This is the test burrito API. Implemented with Nestjs, Typeorm, Postgresql, Docker. The project is hosted on AWS EC2 with RDS and implements CI/CD via GitHub Actions in several steps:
- Execution of tests (placeholders are used in this test app)
- Building and pushing the Docker image to Docker Hub
- SSH into the EC2 instance, pulling of the Docker image, and running the image

I wasn't previously familiar with GitHub Actions, so I had to figure it out on the fly.

## Prerequisite
For local development, ensure Docker and docker-compose are installed on your machine.
## Installation
You can install the necessary packages with the following command:
```bash
npm install
```

## Running the app

First, rename .env.example to .env:
```bash
cp .env.example .env
```
Then, you can run the app in the development mode as follows:
```bash
docker-compose -f compose/docker-compose.yml up --build --remove-orphans
```

## Api test
### Via Swagger:
Locally if docker is running with .env.example variables app swagger ui should be accessible on [localhost:3001/api](https://localhost:3001/api) where api can be tested.

Remote deployment should be accessible [here](http://ec2-44-204-16-117.compute-1.amazonaws.com:3001/api).

Api key: 545c146726002119c0106b5e

### Via curl:
POST for order creation (ids can be retrieved /api/menu-items/options and /api/menu-items):
```bash
curl -X POST http://ec2-44-204-16-117.compute-1.amazonaws.com:3001/api/orders \
-H "Content-Type: application/json" \
-H 'x-api-key: 545c146726002119c0106b5e' \
-d '{
  "items": [
    {       
      "menuItemId": 1,
      "menuItemOptions": [
        {                 
          "menuItemOptionId": 1          
        }                                
      ]  
    }  
  ]  
}'
```
GET for orders retrieval: 
```bash
curl -X GET -H 'x-api-key: 545c146726002119c0106b5e' http://ec2-44-204-16-117.compute-1.amazonaws.com:3001/api/orders
```

GET details for specific order:
```bash
curl -X GET -H 'x-api-key: 545c146726002119c0106b5e' http://ec2-44-204-16-117.compute-1.amazonaws.com:3001/api/orders/1
```
