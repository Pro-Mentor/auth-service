import { RequestBodyFormat } from "@promentor-app/shared-lib";

/**
 * this is Cridentials object for keycloak user creation
 */
interface KeyclockUserCreateCridentials {
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
    credentials: KeyclockUserCreateCridentials[];
    access: KeycloakCreateUserAccess;
}

export { KeycloakCreateUserRequest, KeycloakCreateUserAccess, KeyclockUserCreateCridentials };
