import { WebStorageStateStore, UserManagerSettings } from "oidc-client-ts";

const oidcConfig: UserManagerSettings = {
    authority: 'http://localhost:8080/realms/TestRealm',
    client_id: 'react-client',
    redirect_uri: 'http://localhost:3000/',
    response_type: 'code',
    userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    automaticSilentRenew: true,
};
export default oidcConfig;