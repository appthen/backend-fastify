import fp from 'fastify-plugin'

export default fp(async function (fastify, opts) {
  fastify.decorate('someSupport', function () {
    return 'hugs'
  })
}, {
  name: 'support'
})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string
  }
}