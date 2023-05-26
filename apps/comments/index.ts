import { randomBytes } from "crypto";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";

interface Comment {
  id: string;
  content: string;
}

interface Comments {
  [postId: string]: Comment[];
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

const commentsByPostId: Comments = {};

fastify.get("/api/posts/:id/comments", {
  handler: (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    return reply.code(200).send(commentsByPostId[request.params.id]);
  },
});

fastify.post("/api/posts/:id/comments", {
  handler: (
    request: FastifyRequest<{ Body: Omit<Comment, "id">; Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = request.body;

    const comments = commentsByPostId[request.params.id] ?? [];
    comments.push({ id: commentId, content });

    commentsByPostId[request.params.id] = comments;

    reply.code(201).send(comments);
  },
});

async function main() {
  try {
    await fastify.listen({
      port: 4001,
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
