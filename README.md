# boilerplate-express-sequelize

# Run Docker
./run-docker.sh

# Run Local only node 12
- cd server
- cd src
- nvm use 12
- npm i
- npm run nodemon

# Call Endpoints:

http://localhost:8080/api/products?search_text=Polera&price=gt:49990
http://localhost:8080/api/products?search_text=Polera&price=lt:49990
http://localhost:8080/api/products?search_text=Polera&price=eq:49990
http://localhost:8080/api/products?price=gt:49990
http://localhost:8080/api/products?search_text=Polera
http://localhost:8080/api/search/HeavenStore
http://localhost:8080/api/search/MagicStore
