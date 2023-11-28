import { AxiosException, ErrorCode } from "@promentor-app/shared-lib";
import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "axios";
import { getUserTokenInGivenKeyCloakTenant } from "../service/rest_api/keycloak-rest-service";

const getAccessTokenForTheUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const keyTenant = req.keycloakTenant as string;
        const keyclockIdpServerUrl = req.keycloakIdpServerUrl as string;

        const response = await getUserTokenInGivenKeyCloakTenant(keyclockIdpServerUrl, keyTenant, {
            username: req.body.username,
            password: req.body.password,
            grant_type: "password",
            client_id: process.env.KEYCLOAK_CLIENT_ID as string,
            client_secret: process.env[`${keyTenant.toUpperCase()}_CLIENT_SECRET`] as string,
        });

        return res.status(HttpStatusCode.Ok).json({
            access_token: response?.access_token,
        });
    } catch (error) {
        if (error instanceof AxiosException) {
            if (error.statusCode === HttpStatusCode.Unauthorized) {
                error.errorCode = ErrorCode.UNAUTHORIZED_ACCESS;
            }
        }
        return next(error);
    }
};

export {
    // eslint-disable-next-line import/prefer-default-export
    getAccessTokenForTheUser,
};
