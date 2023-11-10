import { NextFunction, Request, Response } from "express";
import {
    CustomException,
    ErrorCode,
    getKeycloakIdpUrl,
    getTenantIdFromURL,
    rabbitMQPublihserChannelWrapper,
} from "@promentor-app/shared-lib";
import { HttpStatusCode } from "axios";

import { KeycloakCreateUserRequest } from "../models/request/keycloak-requrest-model";
import { createUserInGivenKeyCloakTenant } from "../service/rest_api/keycloak-rest-service";
import { generateTempPassword } from "../utils/password-handler";
import { User } from "../models/domain/User";

import UserTemparyPasswordCreatedPublisher from "../events/publishers/user-tempary-password-created-publisher";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    let keyTenant;
    let keyclockIdpServerUrl;

    try {
        keyTenant = getTenantIdFromURL(req.headers.origin as string);
        keyclockIdpServerUrl = getKeycloakIdpUrl(req.headers.origin as string);

        const { username, email, firstName, lastName, contactNumber } = req.body;

        const tempPassword = generateTempPassword();

        const user: KeycloakCreateUserRequest = {
            username,
            email,
            firstName,
            lastName,
            enabled: true,
            groups: ["student"],
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

        const existingUser = await User.findOne({ email }).exec();

        if (existingUser) {
            console.error("User already exists");
            throw new CustomException(
                "User Created in IDP server. But User already exists in DB",
                ErrorCode.STUDENT_ALREADY_EXISTS_IN_DB,
                HttpStatusCode.Conflict
            );
        }

        const dbUser = User.build({
            username,
            email,
            firstName,
            lastName,
            contactNumber,
            profileUrl: "",
        });

        await dbUser.save();

        await new UserTemparyPasswordCreatedPublisher(rabbitMQPublihserChannelWrapper.publisherChannel).publish({
            username,
            email,
            temparyPassword: tempPassword,
            firstName,
            lastName,
        });

        return res.status(HttpStatusCode.Created).json({ message: "Student created successfully" });
    } catch (error) {
        return next(error);
    }
};

const updateStudent = (req: Request, res: Response) => {
    res.send("Hello from students");
};

export { createStudent, updateStudent };
