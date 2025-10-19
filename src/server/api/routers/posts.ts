import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { user } from "@/server/db/schema/auth";
import { posts } from "@/server/db/schema/posts";
import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";

export const postsRouter = createTRPCRouter({
	// Published posts only
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.db
			.select({
				id: posts.id,
				title: posts.title,
				slug: posts.slug,
				publishedAt: posts.publishedAt,
				author: { name: user.name, image: user.image },
			})
			.from(posts)
			.leftJoin(user, eq(posts.authorId, user.id))
			.where(eq(posts.published, true))
			.orderBy(desc(posts.publishedAt));
	}),
	getAllAdmin: protectedProcedure.query(({ ctx }) => {
		return ctx.db
			.select({
				id: posts.id,
				title: posts.title,
				slug: posts.slug,
				published: posts.published,
				publishedAt: posts.publishedAt,
				createdAt: posts.createdAt,
				updatedAt: posts.updatedAt,
				author: { name: user.name },
				content: posts.content,
			})
			.from(posts)
			.leftJoin(user, eq(posts.authorId, user.id))
			.orderBy(desc(posts.createdAt));
	}),
	// Published posts only
	getBySlug: publicProcedure
		.input(z.object({ slug: z.string() }))
		.query(async ({ ctx, input }) => {
			return ctx.db
				.select({
					id: posts.id,
					title: posts.title,
					slug: posts.slug,
					content: posts.content,
					publishedAt: posts.publishedAt,
					createdAt: posts.createdAt,
					updatedAt: posts.updatedAt,
					author: { name: user.name, image: user.image },
				})
				.from(posts)
				.leftJoin(user, eq(posts.authorId, user.id))
				.where(and(eq(posts.slug, input.slug), eq(posts.published, true)))
				.then((rows) => rows[0] ?? null);
		}),
	getById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			return ctx.db
				.select()
				.from(posts)
				.where(eq(posts.id, input.id))
				.then((rows) => rows[0] ?? null);
		}),

	create: protectedProcedure
		.input(
			z.object({
				title: z.string().min(1),
				slug: z.string().min(1),
				content: z.string(),
				published: z.boolean().default(false),
			}),
		)
		.mutation(({ ctx, input }) => {
			const postId = crypto.randomUUID();

			return ctx.db.insert(posts).values({
				id: postId,
				title: input.title,
				slug: input.slug,
				content: input.content,
				published: input.published,
				authorId: ctx.session.user.id,
			});
		}),
	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string().min(1),
				slug: z.string().min(1),
				content: z.string(),
				published: z.boolean(),
			}),
		)
		.mutation(({ ctx, input }) => {
			return ctx.db
				.update(posts)
				.set({
					title: input.title,
					slug: input.slug,
					content: input.content,
					published: input.published,
				})
				.where(eq(posts.id, input.id));
		}),
	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(({ ctx, input }) => {
			return ctx.db.delete(posts).where(eq(posts.id, input.id));
		}),
});
