import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Utils
import dbConnect from '../../../utils/dbConnect';

// Schema
import User from '../../../schemas/UserSchema';

export default NextAuth({
  secret: 'fusdiofyus876df78suhgdfustdfuysgdufyts67dft7s6tdf78sdg76yfts76dgtfuys',
  pages: {
    signIn: '/panel',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {label: 'Email', type: 'text', placeholder: 'jsmith@example.com'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({
          email: credentials?.email,
          password: credentials?.password,
        }).select('-password');

        if (user) {
          return user;
        }
        return null;
        // You can also Reject this callback with an Error or with a URL:
        // throw new Error('error message') // Redirect to error page
        // throw '/path/to/redirect'        // Redirect to a URL
      },
    }),
  ],
  callbacks: {
    async session({token, session}) {
      const {_id, role} = token._doc;
      session.user = {
        ...session.user,
        _id,
        role,
      };
      return session;
    },
    async jwt({user, token}) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }
      return token;
    },
  },
});
