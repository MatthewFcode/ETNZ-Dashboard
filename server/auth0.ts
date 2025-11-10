import { expressjwt as jwt, GetVerificationKey } from 'express-jwt'
import { Request } from 'express'

import { ParamsDictionary } from 'express-serve-static-core'
import { JwtPayload } from 'jsonwebtoken'
import jwks from 'jwks-rsa'

// TODO: set the domain and audience (API Identifier)
const domain = 'https://matthew-matai-2025.au.auth0.com'
const audience = 'https://etnz/api'

const isTest = process.env.NODE_ENV === 'test'

const checkJwt = isTest
  ? jwt({ secret: 'test-secret', algorithms: ['HS256'] })
  : jwt({
      secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${domain}/.well-known/jwks.json`,
      }) as GetVerificationKey,
      audience: audience,
      issuer: `${domain}/`,
      algorithms: ['RS256'],
    })

export default checkJwt

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface JwtRequest<TReq = any, TRes = any>
  extends Request<ParamsDictionary, TRes, TReq> {
  auth?: JwtPayload
}
