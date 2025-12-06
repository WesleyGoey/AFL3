import { PrismaClient } from "../generated/prisma/client"
import dotenv from "dotenv"
import { computeEtaMinutes } from "../src/models/order-model"

dotenv.config()

const prisma = new PrismaClient()

function computeEta(items: number) {
  return items * 10 + 10
}

async function main() {

  await prisma.order.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.restaurant.deleteMany()

  await prisma.$executeRawUnsafe("ALTER SEQUENCE customers_id_seq RESTART WITH 1")
  await prisma.$executeRawUnsafe("ALTER SEQUENCE restaurants_id_seq RESTART WITH 1")
  await prisma.$executeRawUnsafe("ALTER SEQUENCE orders_id_seq RESTART WITH 1")

  const customer1 = await prisma.customer.create({
    data: { name: "Wesley", phone: "081287638492" },
  })
  const customer2 = await prisma.customer.create({
    data: { name: "Vanness", phone: "085278934567" },
  })
  const customer3 = await prisma.customer.create({
    data: { name: "Mario", phone: "085763579836" },
  })

  const restaurant1 = await prisma.restaurant.create({
    data: { name: "Pizza Hut", description: "Delicious pizza", isOpen: true },
  })
  const restaurant2 = await prisma.restaurant.create({
    data: { name: "Burger King", description: "Tasty burgers", isOpen: true },
  })
  const restaurant3 = await prisma.restaurant.create({
    data: { name: "Sushi Tei", description: "Fresh sushi", isOpen: false },
  })

  await prisma.order.create({
    data: {
      customerId: customer1.id,
      restaurantId: restaurant1.id,
      itemCount: 2,
      orderTime: new Date(),
      etaMinutes: computeEta(2),
    },
  })

  await prisma.order.create({
    data: {
      customerId: customer1.id,
      restaurantId: restaurant2.id,
      itemCount: 1,
      orderTime: new Date(),
      etaMinutes: computeEta(1),
    },
  })

  await prisma.order.create({
    data: {
      customerId: customer2.id,
      restaurantId: restaurant1.id,
      itemCount: 3,
      orderTime: new Date(),
      etaMinutes: computeEta(3),
    },
  })

  await prisma.order.create({
    data: {
      customerId: customer2.id,
      restaurantId: restaurant3.id,
      itemCount: 1,
      orderTime: new Date(),
      etaMinutes: computeEta(1),
    },
  })

  await prisma.order.create({
    data: {
      customerId: customer3.id,
      restaurantId: restaurant2.id,
      itemCount: 4,
      orderTime: new Date(),
      etaMinutes: computeEta(4),
    },
  })
}

main()
  .catch((e) => {
    console.error("Error seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })