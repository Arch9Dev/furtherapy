import Database from 'better-sqlite3';
import { join } from 'path';

const DB_PATH = join(process.cwd(), 'data', 'furtherapy.db');

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
	if (_db) return _db;

	// Ensure data directory exists
	import('fs').then(({ mkdirSync }) => {
		mkdirSync(join(process.cwd(), 'data'), { recursive: true });
	});

	const { mkdirSync } = require('fs');
	mkdirSync(join(process.cwd(), 'data'), { recursive: true });

	_db = new Database(DB_PATH);
	_db.pragma('journal_mode = WAL');
	initSchema(_db);
	return _db;
}

function initSchema(db: Database.Database) {
	db.exec(`
		CREATE TABLE IF NOT EXISTS bookings (
			id          INTEGER PRIMARY KEY AUTOINCREMENT,
			customer_type TEXT NOT NULL CHECK(customer_type IN ('new','returning')),
			service     TEXT NOT NULL CHECK(service IN ('first_visit','return_visit')),
			name        TEXT NOT NULL,
			email       TEXT,
			phone       TEXT,
			dog_name    TEXT NOT NULL,
			date        TEXT NOT NULL,
			time        TEXT NOT NULL,
			status      TEXT NOT NULL DEFAULT 'pending'
				CHECK(status IN ('pending','approved','declined')),
			notes       TEXT,
			created_at  TEXT NOT NULL DEFAULT (datetime('now'))
		);

		CREATE TABLE IF NOT EXISTS weekly_availability (
			id          INTEGER PRIMARY KEY AUTOINCREMENT,
			day_of_week INTEGER NOT NULL UNIQUE, -- 0=Sun, 1=Mon ... 6=Sat
			is_open     INTEGER NOT NULL DEFAULT 0,
			open_time   TEXT,   -- e.g. '09:00'
			close_time  TEXT    -- e.g. '17:00'
		);

		CREATE TABLE IF NOT EXISTS blocked_dates (
			id    INTEGER PRIMARY KEY AUTOINCREMENT,
			date  TEXT NOT NULL UNIQUE  -- YYYY-MM-DD
		);
	`);

	// Seed default weekly availability if empty
	const count = (db.prepare('SELECT COUNT(*) as c FROM weekly_availability').get() as { c: number }).c;
	if (count === 0) {
		const insert = db.prepare(`
			INSERT INTO weekly_availability (day_of_week, is_open, open_time, close_time)
			VALUES (?, ?, ?, ?)
		`);
		// Mon–Fri open 9–5, weekends closed
		const defaults = [
			[0, 0, null, null],
			[1, 1, '09:00', '17:00'],
			[2, 1, '09:00', '17:00'],
			[3, 1, '09:00', '17:00'],
			[4, 1, '09:00', '17:00'],
			[5, 1, '09:00', '17:00'],
			[6, 0, null, null],
		];
		for (const row of defaults) insert.run(...row);
	}
}