-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "publishedDate" DATETIME NOT NULL
);
INSERT INTO "new_Review" ("content", "id", "publishedDate", "rating", "title") SELECT "content", "id", "publishedDate", "rating", "title" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
