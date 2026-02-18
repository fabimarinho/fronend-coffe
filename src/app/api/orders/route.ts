import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";
import { isOrderStatus, parseDateFilter, sanitizeOrderItems } from "@/lib/orders";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const typedBody = body as { items?: unknown; address?: unknown };
  const items = typedBody?.items;
  const address = typeof typedBody?.address === "string" ? typedBody.address : null;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Items are required" }, { status: 400 });
  }

  const sanitized = sanitizeOrderItems(items);

  if (sanitized.length === 0) {
    return NextResponse.json({ error: "Invalid items" }, { status: 400 });
  }

  const subtotal = sanitized.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const discount = 0;
  const total = subtotal - discount;

  const order = await prisma.order.create({
    data: {
      userEmail: session.user.email,
      subtotal,
      discount,
      total,
      address,
      items: {
        create: sanitized,
      },
    },
    include: { items: true },
  });

  return NextResponse.json({ order });
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session?.user?.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Math.max(5, Number(searchParams.get("limit") ?? 10)));
  const statusCandidate = searchParams.get("status") ?? "";
  const status = isOrderStatus(statusCandidate) ? statusCandidate : "";
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

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
  const skip = (page - 1) * limit;

  const total = await prisma.order.count({ where });
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
    where,
    skip,
    take: limit,
  });

  return NextResponse.json({
    page,
    limit,
    total,
    orders,
  });
}
