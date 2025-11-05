import ordersData from "@/services/mockData/orders.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let orders = [...ordersData];

const orderService = {
  async create(orderData) {
    await delay(500);
    
    const newOrder = {
      Id: Math.max(...orders.map(o => o.Id), 0) + 1,
      ...orderData,
      orderDate: new Date().toISOString(),
      status: "confirmed"
    };

    orders.push(newOrder);
    return { ...newOrder };
  },

  async getById(id) {
    await delay(200);
    const order = orders.find(o => o.Id === parseInt(id));
    if (!order) {
      throw new Error("Order not found");
    }
    return { ...order };
  },

  async getAll() {
    await delay(300);
    return [...orders];
  }
};

export default orderService;