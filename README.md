# auth-service

Handling Users and Authentication

### swagger url

http://sltc.app.promentor.local:8081/api/v1/auth/api-docs

### configure the service

-   create a `.env` file in the root of the derectory
-   replace the required properties of the .env values

```
HOST=sltc.app.promentor.local
PORT=8081
KEYCLOAK_CLIENT_ID=pro-mentor-auth-service
SLTC_CLIENT_SECRET=r0*********************dv
```

### CI/CD

<img src="https://github.com/Pro-Mentor/auth-service/tree/main/assets/Auth_Deployment.png" alt="CI/CD diagram" title="CI/CD Diagram">
