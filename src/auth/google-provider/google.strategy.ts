import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
	constructor(configService: ConfigService) {
		super({
			clientID: configService.get("GOOGLE_CLIENT_ID"),
			clientSecret: configService.get("GOOGLE_CLIENT_SECRET"),
			callbackURL: configService.get("GOOGLE_CALLBACK_URL"),
			scope: ["email", "profile"],
			accessType: "offline",
			prompt: "consent",
		});
	}

	async validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
		done: VerifyCallback,
	) {
		const id = profile.id;
		const name = profile.name;
		const email = profile.emails?.[0]?.value;
		const picture = profile.photos?.[0].value;

		if (!email || !name || !picture)
			return done(new Error("No email found in user profile"));

		done(null, {
			id,
			email,
			firstName: name.givenName,
			lastName: name.familyName,
			picture,
		});
	}
}
