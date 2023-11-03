import { RequestBodyFormat } from "@promentor-app/shared-lib";

/**
 * this is Cridentials object for keycloak user creation
 */
interface KeycloakUserCreateCridentials {
    type: string;
    temporary: boolean;
    value: string;
}

/**
 * this is access object for keycloak user creation
 */
interface KeycloakCreateUserAccess {
    manageGroupMembership: boolean;
    view: boolean;
    mapRoles: boolean;
    impersonate: boolean;
    manage: boolean;
}

/**
 * this is request body for keycloak user creation
 */
interface KeycloakCreateUserRequest extends RequestBodyFormat {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    enabled: boolean;
    groups: string[];
    credentials: KeycloakUserCreateCridentials[];
    access: KeycloakCreateUserAccess;
}

interface KycloakGetUserTokenRequestBody extends RequestBodyFormat {
    grant_type: string;
    username: string;
    password: string;
    client_id: string;
    client_secret: string;
}

export {
    KeycloakCreateUserRequest,
    KeycloakCreateUserAccess,
    KeycloakUserCreateCridentials,
    KycloakGetUserTokenRequestBody,
};
