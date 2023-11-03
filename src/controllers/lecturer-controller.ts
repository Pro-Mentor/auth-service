import { NextFunction, Request, Response } from "express";
import { getKeycloakIdpUrl, getTenantIdFromURL } from "@promentor-app/shared-lib";
import { HttpStatusCode } from "axios";

import { KeycloakCreateUserRequest } from "../models/request/keycloak-requrest-model";
import createUserInGivenKeyCloakTenant from "../service/rest_api/keycloak-rest-service";
import { generateTempPassword } from "../utils/password-handler";

const createLecturer = async (req: Request, res: Response, next: NextFunction) => {
    let keyTenant;
    let keyclockIdpServerUrl;

    try {
        keyTenant = getTenantIdFromURL(req.headers.origin as string);
        keyclockIdpServerUrl = getKeycloakIdpUrl(req.headers.origin as string);

        const { username, email, firstName, lastName } = req.body;

        const tempPassword = generateTempPassword();
        console.log("generated tempary password: ", tempPassword);

        const user: KeycloakCreateUserRequest = {
            username,
            email,
            firstName,
            lastName,
            enabled: true,
            groups: ["lecture"],
            credentials: [
                {
                    type: "password",
                    temporary: true,
                    value: tempPassword,
                },
            ],
            access: {
                manageGroupMembership: true,
                view: true,
                mapRoles: true,
                impersonate: true,
                manage: true,
            },
        };

        await createUserInGivenKeyCloakTenant(
            keyclockIdpServerUrl,
            keyTenant,
            user,
            req.headers.authorization as string
        );

        return res.status(HttpStatusCode.Created).json({ message: "Lecture created successfully" });
    } catch (error) {
        return next(error);
    }
};

export {
    // eslint-disable-next-line import/prefer-default-export
    createLecturer,
};
