import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios")
        }

        // Validar entrada
        const validatedFields = loginSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
        })

        if (!validatedFields.success) {
          throw new Error("Dados inválidos")
        }

        const { email, password } = validatedFields.data

        // Buscar usuário no banco
        const user = await prisma.user.findUnique({
          where: { email }
        })

        if (!user || !user.password) {
          throw new Error("Credenciais inválidas")
        }

        // Verificar senha
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
          throw new Error("Credenciais inválidas")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    signUp: "/register",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

