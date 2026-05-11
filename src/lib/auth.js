import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

export const authOptions = {
    adapter: PrismaAdapter(prisma),//store and manage user, account, session in database 

    providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {

        console.log(credentials)// debugging 
        
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        console.log(user);// debugging 

        if (!user || !user.hashedPassword) {
          throw new Error('No account found with this email');
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isPasswordValid) {
          throw new Error('Incorrect password');
        }
        return user;
      },
    }),
  ],

    session: { strategy: 'jwt' },

    callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}