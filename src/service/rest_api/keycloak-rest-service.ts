import { ResponseBodyFormat, invokeRestEndpoint } from "@promentor-app/shared-lib";

import { KeycloakCreateUserRequest } from "../../models/request/keycloak-requrest-model";

/**
 * this function creates a user in a given keycloak tenant
 * @param keyclockIdpServerUrl the url of the keycloak server
 * @param keyTenant the tenant name
 * @param body the body of the request
 * @param authToken the auth token
 * @returns a promise of void
 * @throws an error if the request fails
 * @example
 * ```typescript
 * const user: KeycloakCreateUserRequest = {
 *      username,
 *      email,
 *      firstName,
 *      lastName,
 *      enabled: true,
 *      groups: ["student"],
 *      credentials: [
 *          {
 *              type: "password",
 *              temporary: true,
 *              value: tempPassword,
 *          },
 *      ],
 *      access: {
 *          manageGroupMembership: true,
 *          view: true,
 *          mapRoles: true,
 *          impersonate: true,
 *          manage: true,
 *      },
 * };
 *
 * await createUserInGivenKeyCloakTenant(
 *      keyclockIdpServerUrl,
 *      keyTenant,
 *      user,
 *      req.headers.authorization as string
 * );
 * ```
 * @see {@link https://www.keycloak.org/docs-api/21.0.1/rest-api/index.html}
 */
const createUserInGivenKeyCloakTenant = async (
    keyclockIdpServerUrl: string,
    keyTenant: string,
    body: KeycloakCreateUserRequest,
    authToken: string
) => {
    await invokeRestEndpoint<ResponseBodyFormat>(
        `${keyclockIdpServerUrl}/admin/realms/${keyTenant}/users`,
        "POST",
        body,
        {
            "Content-Type": "application/json",
            Authorization: authToken,
        }
    );
};

export default createUserInGivenKeyCloakTenant;
