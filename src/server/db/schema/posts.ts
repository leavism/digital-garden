import {
	boolean,
	mysqlTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/mysql-core";
import { user } from "./auth";

export const posts = mysqlTable("posts", {
	id: varchar("id", { length: 36 }).primaryKey(),
	title: text("title").notNull(),
	slug: varchar("slug", { length: 255 }).notNull().unique(),
	content: text("content").notNull(),
	published: boolean("published").notNull().default(false),
	publishedAt: timestamp("published_at"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
	authorId: varchar("author_id", { length: 36 })
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});
