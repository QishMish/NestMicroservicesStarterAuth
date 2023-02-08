type AuthTokenWithCookiesResponse = { cookie: string; token: string };
type AuthTokensResponse = { accessToken: string; refreshToken: string };

export { AuthTokensResponse, AuthTokenWithCookiesResponse };
