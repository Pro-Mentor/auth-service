import { ResponseBodyFormat } from "@promentor-app/shared-lib";

interface KeycloakGetTokenResponse extends ResponseBodyFormat {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    id_token: string;
    not_before_policy: number;
    session_state: string;
    scope: string;
}

export {
    // eslint-disable-next-line import/prefer-default-export
    KeycloakGetTokenResponse,
};
