import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import 'dotenv/config';

const adapter = new PrismaBetterSqlite3({
  url: 'file:./../../apps/api/dev.db',
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Simon',
    email: 'simon@simpleprax.com',
    password: 'ultraSecurePassword',
  },
  {
    name: 'Max',
    email: 'max-mustermann@gmail.com',
    password: 'anotherSecurePassword',
  },
];

const reviewData: Prisma.ReviewCreateInput[] = [
  {
    title: 'Super tolle Praxis, gerne wieder!',
    content:
      'Bavaria ipsum dolor sit amet Lewakaas ghupft wia gsprunga, gfreit mi Watschnpladdla ned woar kloan Lewakaas heid. Eam Fingahaggln muass, Graudwiggal griaß God beinand. Ma Radler Brotzeit, singan um Godds wujn a Maß und no a Maß. Hod zua pfenningguat wuid nackata Biaschlegl vo de singan auffi. D’ wos Obazda, Foidweg. Nois mechad pfundig und sei i hob di liab Charivari, dahoam hob Ohrwaschl blärrd i hab an. Sog i zwoa mogsd a Bussal do, Biakriagal und Blosmusi i mechad dee Schwoanshaxn koa. Wiavui Edlweiss Zidern Engelgwand in da greana Au. Hoaglig Schbozal hogg ma uns zamm wea nia ausgähd, kummt nia hoam, schoo hod.',
    rating: 4,
    isRead: false,
    publishedDate: new Date('2025-01-01'),
  },
];

export async function main() {
  for (const user of userData) {
    await prisma.user.create({ data: user });
  }

  for (const review of reviewData) {
    await prisma.review.create({ data: review });
  }
}

main();
