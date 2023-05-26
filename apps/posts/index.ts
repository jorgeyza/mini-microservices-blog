import { randomBytes } from "crypto";
import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import cors from "@fastify/cors";

interface Post {
  id: string;
  title: string;
}

interface Posts {
  [postId: string]: Post;
}

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

await fastify.register(cors, {
  origin: "http://localhost:3000",
});

// No db, all posts will be in memory.
const posts: Posts = {};

fastify.get("/api/posts", {
  handler: (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send(posts);
  },
});

fastify.post("/api/posts", {
  handler: (
    request: FastifyRequest<{
      Body: Omit<Post, "id">;
    }>,
    reply: FastifyReply
  ) => {
    const id = randomBytes(4).toString("hex");
    const { title } = request.body;

    posts[id] = {
      id,
      title,
    };

    return reply.code(201).send(posts[id]);
  },
});

async function main() {
  try {
    await fastify.listen({
      port: 4000,
      host: "0.0.0.0",
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close();
    process.exit(0);
  });
});

main();
