import { UserManager } from "oidc-client-ts";
import oidcConfig from "./config/keycloak.config";

const userManager = new UserManager(oidcConfig);
export default userManager;