import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/lib/products";

function getStripeClient() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error("Stripe is not configured.");
  }

  return new Stripe(apiKey, { apiVersion: "2026-11-18.endive" });
}

const MAX_QUANTITY_PER_PRODUCT = 10;
const MAX_QUANTITY_PER_ORDER = 20;

export async function POST(request: Request) {
  try {
    const payload: unknown = await request.json();

    if (!payload || typeof payload !== "object" || !("items" in payload) || !Array.isArray(payload.items)) {
      return NextResponse.json({ error: "Daftar produk tidak valid." }, { status: 400 });
    }

    if (!("requestId" in payload) || typeof payload.requestId !== "string" || !/^[0-9a-f-]{36}$/i.test(payload.requestId)) {
      return NextResponse.json({ error: "ID permintaan tidak valid." }, { status: 400 });
    }

    const quantities = new Map<number, number>();
    let orderQuantity = 0;

    for (const item of payload.items) {
      if (!item || typeof item !== "object" || !("id" in item) || !("quantity" in item)) {
        return NextResponse.json({ error: "Item pesanan tidak valid." }, { status: 400 });
      }

      const id = item.id;
      const quantity = item.quantity;
      if (typeof id !== "number" || !Number.isInteger(id) || typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1) {
        return NextResponse.json({ error: "Jumlah produk harus berupa bilangan bulat positif." }, { status: 400 });
      }

      const product = products.find((candidate) => candidate.id === id);
      if (!product) {
        return NextResponse.json({ error: "Produk tidak ditemukan." }, { status: 400 });
      }

      const nextQuantity = (quantities.get(id) ?? 0) + quantity;
      if (nextQuantity > MAX_QUANTITY_PER_PRODUCT) {
        return NextResponse.json({ error: "Jumlah produk melebihi batas." }, { status: 400 });
      }

      quantities.set(id, nextQuantity);
      orderQuantity += quantity;
      if (orderQuantity > MAX_QUANTITY_PER_ORDER) {
        return NextResponse.json({ error: "Jumlah pesanan melebihi batas." }, { status: 400 });
      }
    }

    if (quantities.size === 0) {
      return NextResponse.json({ error: "Keranjang kosong." }, { status: 400 });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = Array.from(quantities, ([id, quantity]) => {
      const product = products.find((candidate) => candidate.id === id)!;
      return {
        price_data: {
          currency: "idr",
          product_data: {
            name: product.name,
            description: product.category,
          },
          unit_amount: product.price,
        },
        quantity,
      };
    });

    const origin = new URL(request.url).origin;
    const session = await getStripeClient().checkout.sessions.create(
      {
        line_items: lineItems,
        mode: "payment",
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/checkout/cancel`,
      },
      { idempotencyKey: payload.requestId },
    );

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat membuat sesi pembayaran." },
      { status: 500 },
    );
  }
}
