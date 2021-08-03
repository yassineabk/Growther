import { BACKEND_API, FRONTEND_API } from "../../services/links"

export const googleUri=`${BACKEND_API}/oauth2/authorize/google?redirect_uri=${FRONTEND_API}/oauth2/redirect`
export const facebookUri=`${BACKEND_API}/oauth2/authorize/facebook?redirect_uri=${FRONTEND_API}/oauth2/redirect`
