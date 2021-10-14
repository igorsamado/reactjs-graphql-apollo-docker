const { ApolloServer } = require('apollo-server')
const { readFileSync } = require('fs')
const path = require('path');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const resolvers = {
  Query: {
    getAllAlunos: async (parent, args, context) => {
      return context.prisma.aluno.findMany()
    }
  },
  Mutation: {
    addAluno: async (parent, args, context) => {
      return context.prisma.aluno.create({
        data: {
          nome: args.nome,
          email: args.email,
          cpf: args.cpf
        }
      })
    },
    removeAluno:  async (parent, args, context) => {
      return context.prisma.aluno.delete({
        where: { id: args.id }
      })
    }
  }
}

const server = new ApolloServer({
  typeDefs: readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma
  }
})

server
  .listen()
  .then(({ url }) => 
    console.log(`Server is running on ${url}`)
  )