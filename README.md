# 👨🏻‍⚕️ Practice Review

## 🎨 Design Decisions

### Repository

I chose a monorepo to reduce code duplication as much as possible and to keep all code centralized in one place.

### Typing

To keep all my communication type-safe and ensure that I don’t have to fiddle with SQL, I decided to use Prisma. We define our schema once in a shared package, and Prisma generates all the types and an ORM for us. Because we opted for a monorepo, we can now use these types across both apps, frontend and backend. This elegantly avoids duplication issues and makes our lives a lot easier.

### Database

The database is a SQLite file to keep the setup simple for this challenge while still providing a queryable data source.

### Backend

I wanted to go with a NextJS backend at first but thought that would be kind of lame. I decided to try out NestJS and went with that. I implemented all API calls inside a single controller for simplicity.

### Frontend

My frontend is a simple Next.js application that uses some shadcn components and Tailwind for styling. Initially, I wanted to implement a real login, but I realized that this would go far beyond the scope of this challenge, so I opted to fake it for now. The features I implemented include:

- Users can submit a review with a rating, title, and content
- Administrators can “log in” and view all reviews
- Reviews can be filtered based on whether they have been read or not
- Reviews can be sorted by creation date
- Reviews can be marked as read or unread

## 🛠️ Development Setup

Install all required packages:

```bash
npm install
```

Generate the Prisma client and all types from the schema:

```bash
npm run generate
```

Create our local database:

```bash
npm run db:migrate:dev
```

Seed the database with some test data:

```bash
npm run db:seed
```

Now you can start backend and frontend with:

```bash
npm run dev
```

The frontend should now be available under:

```text
http://localhost:3000/
```
