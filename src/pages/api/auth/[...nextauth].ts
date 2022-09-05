import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("サインイン");
      console.log(user, account, profile, email, credentials)
      return true;
    },
    async session({ session, user, token }) {
      console.log('セッション')
      console.log({session, user, token})
      return session;
    },
  },
  pages: {
    // signIn: "/signin",
    signOut: "/signin",
  },
  secret: "secret",
});
