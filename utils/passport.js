import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt as ExtractJwt } from "passport-jwt";
import { EMAIL_PROVIDER, ROLES } from "../constants/role.constants.js";
import userModel from "../models/user.model.js";

const User = userModel;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_KEY;

passport.use(
  new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

export default async (app) => {
  app.use(passport.initialize());

  await googleAuth();
};

const googleAuth = async () => {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          callbackURL: process.env.CLIENT_URL,
        },
        (accessToken, refreshToken, profile, done) => {
          User.findOne({ email: profile.email })
            .then((user) => {
              if (user) {
                return done(null, user);
              }

              const name = profile.displayName.split(" ");

              const newUser = new User({
                provider: EMAIL_PROVIDER.Google,
                googleId: profile.id,
                email: profile.email,
                name: name[0][1],
                avatar: profile.picture,
                password: null,
                confirmPassword: null,
                role: ROLES.SELLER,
              });

              newUser.save((err, user) => {
                if (err) {
                  return done(err, false);
                }

                return done(null, user);
              });
            })
            .catch((err) => {
              return done(err, false);
            });
        }
      )
    );
  } catch (error) {
    console.log("Missing google keys");
  }
};
