// Dados fake
export const users = [
  {
    id: "user1",
    name: "Hugo",
    email: "hugo@example.com",
    emailVerified: true,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "user2",
    name: "Alice",
    email: "alice@example.com",
    emailVerified: false,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const houses = [
  {
    id: 1,
    name: "Casa do Hugo",
    users: [users[0], users[1]],
    rooms: [],
    accounts: [],
    infos: [],
  },
];

export const rooms = [
  {
    id: 1,
    name: "Sala",
    houseId: 1,
    tasks: [],
  },
  {
    id: 2,
    name: "Cozinha",
    houseId: 1,
    tasks: [],
  },
];

export const tasks = [
  {
    id: 1,
    title: "Lavar a louça",
    description: "Lavar pratos, copos e talheres",
    status: false,
    roomId: 2,
    assigned: [users[0]],
  },
  {
    id: 2,
    title: "Limpar a sala",
    description: null,
    status: true,
    roomId: 1,
    assigned: [users[1]],
  },
];

export const accounts = [
  {
    id: 1,
    title: "Conta de luz",
    description: "Conta do mês de dezembro",
    totalValue: 120.5,
    dueDate: new Date("2025-12-31"),
    houseId: 1,
    responsibleId: "user1",
    shares: [],
  },
];

export const shares = [
  {
    id: 1,
    accountId: 1,
    userId: "user1",
    value: 60.25,
    paid: true,
  },
  {
    id: 2,
    accountId: 1,
    userId: "user2",
    value: 60.25,
    paid: false,
  },
];

export const houseInfos = [
  {
    id: 1,
    houseId: 1,
    key: "Endereço",
    value: "Rua Principal, 123",
  },
  {
    id: 2,
    houseId: 1,
    key: "Cidade",
    value: "Dublin",
  },
];
