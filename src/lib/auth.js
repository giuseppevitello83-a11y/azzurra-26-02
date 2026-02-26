import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "lib", "db.json");

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!fs.existsSync(dbPath)) return null;
                const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
                const user = db.users.find(u => u.username === credentials.username && u.password === credentials.password);

                if (user) {
                    return { id: user.id, name: user.name, email: user.email, role: user.role };
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
            }
            return session;
        }
        ,
    },
    pages: {
        signIn: "/auth",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
