import { getServerSession } from "next-auth";
import type { Prisma } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";
import { isOrderStatus, parseDateFilter } from "@/lib/orders";
import AdminOrdersTable from "./orders-table";
import PromoABStats from "./promo-ab-stats";
import MenuAnalyticsStats from "./menu-analytics-stats";
import styles from "./styles.module.scss";

type SearchParams = {
  page?: string;
  limit?: string;
  status?: string;
  from?: string;
  to?: string;
};

type OrderItemView = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type OrderView = {
  id: string;
  userEmail: string;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItemView[];
};

type OrderWithItems = Prisma.OrderGetPayload<{
  include: { items: true };
}>;

export default async function AdminPage(props: { searchParams?: Promise<SearchParams> }) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!isAdmin(email)) {
    return (
      <main className={styles.page}>
        <section className={styles.denied}>
        <h1>Acesso negado</h1>
        <p>Voce nao tem permissao para acessar esta area.</p>
        </section>
      </main>
    );
  }

  const resolved = await props.searchParams;
  const searchParams = resolved ?? {};

  const page = Math.max(1, Number(searchParams.page ?? 1));
  const limit = Math.min(50, Math.max(5, Number(searchParams.limit ?? 10)));
  const statusCandidate = typeof searchParams.status === "string" ? searchParams.status : "";
  const status = isOrderStatus(statusCandidate) ? statusCandidate : "";
  const from = typeof searchParams.from === "string" ? searchParams.from : "";
  const to = typeof searchParams.to === "string" ? searchParams.to : "";

  const where: {
    status?: string;
    createdAt?: { gte?: Date; lte?: Date };
  } = {};

  if (status) {
    where.status = status;
  }

  const fromDate = parseDateFilter(from);
  const toDate = parseDateFilter(to);

  if (fromDate || toDate) {
    where.createdAt = {};
    if (fromDate) where.createdAt.gte = fromDate;
    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
      where.createdAt.lte = toDate;
    }
  }

  const total = await prisma.order.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const skip = (page - 1) * limit;

  const orders: OrderWithItems[] = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
    where,
    skip,
    take: limit,
  });

  const viewOrders: OrderView[] = orders.map((order) => ({
    id: order.id,
    userEmail: order.userEmail,
    status: order.status,
    total: order.total,
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
  }));

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <header className={styles.header}>
          <h1>Area administrativa</h1>
          <p>Acompanhe pedidos, status e metricas de interacao da vitrine.</p>
        </header>

        <PromoABStats />
        <MenuAnalyticsStats />

        <AdminOrdersTable
          orders={viewOrders}
          page={page}
          totalPages={totalPages}
          limit={limit}
          status={status}
          from={from}
          to={to}
        />
      </section>
    </main>
  );
}
