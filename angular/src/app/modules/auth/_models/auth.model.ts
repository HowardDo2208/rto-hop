export class AuthModel {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;

  setAuth(auth: any) {
    this.token_type = auth.token_type
    this.access_token = auth.access_token;
    this.refresh_token = auth.refresh_token;
    this.expires_in = auth.expires_in;
  }
}