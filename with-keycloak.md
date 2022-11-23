## Guide for Running [`app-builder`](https://github.com/entando/app-builder) locally with [`entando-de-app`](https://github.com/entando/entando-de-app) and [`keycloak`](https://github.com/entando/entando-keycloak) authentication server

###  Run keycloak server:
- `git clone https://github.com/entando/entando-keycloak.git`
- `cd entando-keycloak`
- `docker-compose up --build keycloak` or `docker compose up --build -keycloak`
###  Setup keycloak realm and client
- `git clone https://github.com/entando/entando-keycloak-plugin.git`
- Navigate to: http://localhost:8081/auth and log into keycloak admin console
- id/pass: `admin`/`qwe123`
- Top left corner click:  Add Realm
- Click import json file. Choose a file from cloned `entando-keycloak-plugin/keycloak/realm-export.json`
Now you have 2 clients that you will be using: 1) `entando-core` and 2) `entando-web`
### Configure clients
- Go to `Clients/entando-core` and make changes as described below:
- Put `*` in valid redirect URIs.
- Put `*` in web origin.
- Do the same for `Clients/entando-web`
- Also, make `entando-web` client `public`.
- Now go to `Clients/entando-core` again, and go to a tab called `Service Accounts...`
- You should choose a client `realm-management` from dropdown and assign `realm-admin` to the right.
- Also, choose `entando-core` in dropdown and assign `superuser` to the right.
- Now restart the keycloak server.
- Go to `Users` and add a new user called `admin` that you will be using during `app-builder` login.
- In `Users/admin` go to the `Credentials` tab and add a password for the `admin` user
### Setup entando-de-app
- Clone: https://github.com/entando-k8s/entando-de-app/
- Open `pom.xml` file and find `<!-- Keycloak Configuration -->`, then update the following values:
```
<keycloak.enabled>true</keycloak.enabled>
<keycloak.auth.url>http://localhost:8081/auth</keycloak.auth.url>
<keycloak.realm>entando-development</keycloak.realm>
<keycloak.client.id>entando-core</keycloak.client.id>
<keycloak.client.secret>YOUR SECRET HERE from KEYCLOAK</keycloak.client.secret>
```
As for secret you need to go to keycloak , then go to `Clients/entando-core` and click `Credentials` tab, there you will see a secret and put that secret into `pom.xml` . As for other lines, you can keep them same as in the snippet above.
- Now run entando-de-app via running: `mvn clean package jetty:run-war -Pjetty-local -Pderby -Pkeycloak`
### Setup app-builder
- git clone https://github.com/entando/app-builder.git
- You must have node version `14.*`
- Run: `npm install`
- Create a file `.env.local`
- Put these lines into that file:
```
USE_MOCKS=false 
USE_MFE=false
USE_REMOTE_MFE=false
USE_LOCAL_MFE=false
USE_MFE_MOCKS=false
CI=false
KEYCLOAK_ENABLED=true
DOMAIN=http://localhost:8080/entando-de-app
PUBLIC_URL=/app-builder
```
- `npm start`
- Navigate to: `localhost:3000` and try to log in with user you created in the last step of `Configure clients`
