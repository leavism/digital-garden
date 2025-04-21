/**
 * Database connection manager that provides a Drizzle ORM instance.
 * This module handles the connection to MySQL and provides a configured
 * Drizzle instance for database operations.
 */

import { env } from "@/env";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

interface GlobalWithConn {
	connection: mysql.Pool | undefined;
}

/**
 * Cache the database connection in development to prevent creating
 * a new connection on every hot module reload. This avoids connection
 * pool exhaustion during development.
 */
const globalForDb = globalThis as unknown as GlobalWithConn;

/**
 * Create or reuse a MySQL connection pool.
 * - In development: Reuses the existing connection from the global cache
 * - In production: Creates a new connection (global caching isn't needed)
 *
 * This pattern prevents connection leaks during development when
 * files are frequently reloaded.
 */
const connection =
	globalForDb.connection ??
	mysql.createPool({
		uri: env.DATABASE_URL,
	});

/**
 * Store the connection in global scope to reuse across
 * hot module reloads in development environment.
 */
if (process.env.NODE_ENV !== "production") globalForDb.connection = connection;

/**
 * Configured Drizzle ORM instance with the MySQL connection
 * and schema definitions. Use this to perform database operations
 * throughout the application.
 *
 * @example
 * // Query users table
 * const users = await db.query.user.findMany();
 *
 * // Insert a new record
 * await db.insert(schema.user).values({...});
 */
export const db = drizzle(connection);
