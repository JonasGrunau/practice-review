# 👨🏻‍⚕️ Practice Review

## 🎨 Design Decisions

### Repository

I went with a mono repo to have as little duplicate code as possible.

### Typing

To keep all my communication type safe and ensure that I don't have to fiddle with SQL I decided to use Prisma. We define our schema once as a package and prisma generates us all types and an ORM. Because we went for a mono repo, we can now use our types across both apps, frontend and backend. This beautifully handles all issues regarding duplication and makes our life a lot easier.

### Database

The database is a SQLite-File to keep it simple for this challenge but still have something that i can query.

### Backend

I wanted to go with a NextJS Backend at first but thought that would be kind of lame. I decided to try out NestJS und went with that. I implemented all api calls inside a single controller for simplicity.

### Frontend

My frontend is a simple NextJS Frontend with some shadcn components and tailwind for styling. I wanted to create a real login at first but realized this would have gone way beyond the scope of this challenge, so I faked it for now. The features that I implemented include:

- User can submit review with rating, title and content
- Administrator can "login" and see all reviews
- Reviews can be filtered based on if they are read or not
- Reviews can be sorted by creation date
- Reviews can be marked as read or unread

## 🛠️ Development Setup

Install all required packages:

```bash
npm install
```

Generate the prisma client and all types from the schema:

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
