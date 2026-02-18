"use client";

import Link from "next/link";
import { useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/orders";
import styles from "./styles.module.scss";

type OrderItem = {
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
  items: OrderItem[];
};

const STATUS_OPTIONS = ["", ...ORDER_STATUSES];

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendente",
  paid: "Pago",
  delivered: "Entregue",
};

function buildQuery(params: Record<string, string>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });
  const query = search.toString();
  return query ? `?${query}` : "";
}

function getBadgeClass(status: string) {
  if (status === "pending") return styles.badgePending;
  if (status === "paid") return styles.badgePaid;
  if (status === "delivered") return styles.badgeDelivered;
  return styles.badgePending;
}

export default function AdminOrdersTable({
  orders,
  page,
  totalPages,
  limit,
  status,
  from,
  to,
}: {
  orders: OrderView[];
  page: number;
  totalPages: number;
  limit: number;
  status: string;
  from: string;
  to: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const pages = useMemo(() => {
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages]);

  const handleStatusChange = async (id: string, nextStatus: string) => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    startTransition(() => router.refresh());
  };

  const handleApplyFilters = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const nextStatus = String(formData.get("status") ?? "");
    const nextFrom = String(formData.get("from") ?? "");
    const nextTo = String(formData.get("to") ?? "");
    const query = buildQuery({ page: "1", limit: String(limit), status: nextStatus, from: nextFrom, to: nextTo });
    router.push(`/admin${query}`);
  };

  const handleClearFilters = () => {
    router.push(`/admin?page=1&limit=${limit}`);
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleApplyFilters(event.currentTarget);
        }}
        className={styles.filtersForm}
      >
        <select name="status" defaultValue={status} className={styles.filterSelect}>
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option ? STATUS_LABELS[option as OrderStatus] : "Todos os status"}
            </option>
          ))}
        </select>
        <input type="date" name="from" defaultValue={from} className={styles.filterDate} />
        <input type="date" name="to" defaultValue={to} className={styles.filterDate} />
        <button type="submit" className={styles.filterButton}>
          Filtrar
        </button>
        <button type="button" onClick={handleClearFilters} className={styles.clearFilterButton}>
          Limpar
        </button>
      </form>

      {orders.length === 0 ? (
        <p className={styles.emptyText}>Nenhum pedido encontrado.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>ID</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Total</th>
                <th className={styles.th}>Criado em</th>
                <th className={styles.th}>Itens</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className={styles.td}>{order.id}</td>
                  <td className={styles.td}>{order.userEmail}</td>
                  <td className={styles.td}>
                    <select
                      value={order.status}
                      onChange={(event) => handleStatusChange(order.id, event.target.value)}
                      disabled={isPending}
                      className={styles.statusSelect}
                    >
                      {ORDER_STATUSES.map((value) => (
                        <option key={value} value={value}>
                          {STATUS_LABELS[value]}
                        </option>
                      ))}
                    </select>
                    <span className={`${styles.badge} ${getBadgeClass(order.status)}`}>
                      {STATUS_LABELS[order.status as OrderStatus] ?? order.status}
                    </span>
                  </td>
                  <td className={styles.td}>R$ {order.total.toFixed(2)}</td>
                  <td className={styles.td}>{new Date(order.createdAt).toLocaleString("pt-BR")}</td>
                  <td className={styles.td}>
                    <div className={styles.itemsCell}>
                      {order.items.map((item) => (
                        <div key={item.id} className={styles.itemLine}>
                          {item.quantity}x {item.name} (R$ {item.price.toFixed(2)})
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.pagination}>
        {pages.map((p) => {
          const query = buildQuery({
            page: String(p),
            limit: String(limit),
            status,
            from,
            to,
          });
          const activeClass = p === page ? ` ${styles.pageLinkActive}` : "";
          return (
            <Link key={p} href={`/admin${query}`} className={`${styles.pageLink}${activeClass}`}>
              {p}
            </Link>
          );
        })}
      </div>
    </>
  );
}
