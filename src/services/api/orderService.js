import { getApperClient } from "@/services/apperClient";

const orderService = {
  async create(orderData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.createRecord('order_c', {
        records: [{
          Name: `Order ${Date.now()}`,
          customer_info_name_c: orderData.customerInfo.name,
          customer_info_email_c: orderData.customerInfo.email,
          customer_info_address_c: orderData.customerInfo.address,
          items_name_c: orderData.items.map(item => item.name).join('\n'),
          items_price_c: orderData.items.map(item => item.price.toString()).join('\n'),
          items_product_id_c: orderData.items.map(item => item.productId.toString()).join('\n'),
          items_quantity_c: orderData.items.map(item => item.quantity.toString()).join('\n'),
          items_selected_color_c: orderData.items.map(item => item.selectedColor || '').join('\n'),
          items_selected_size_c: orderData.items.map(item => item.selectedSize || '').join('\n'),
          order_date_c: new Date().toISOString(),
          status_c: "confirmed",
          total_c: orderData.total
        }]
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to create order");
      }

      if (response.results && response.results[0] && response.results[0].success) {
        const createdOrder = response.results[0].data;
        
        // Transform the database record back to the expected format
        return {
          Id: createdOrder.Id,
          items: orderData.items, // Use original items structure
          total: orderData.total,
          customerInfo: orderData.customerInfo,
          orderDate: createdOrder.order_date_c,
          status: createdOrder.status_c
        };
      } else {
        throw new Error("Order creation failed");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.getRecordById('order_c', parseInt(id), {
        fields: [
          {"field": {"Name": "customer_info_name_c"}},
          {"field": {"Name": "customer_info_email_c"}},
          {"field": {"Name": "customer_info_address_c"}},
          {"field": {"Name": "items_name_c"}},
          {"field": {"Name": "items_price_c"}},
          {"field": {"Name": "items_product_id_c"}},
          {"field": {"Name": "items_quantity_c"}},
          {"field": {"Name": "items_selected_color_c"}},
          {"field": {"Name": "items_selected_size_c"}},
          {"field": {"Name": "order_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "total_c"}}
        ]
      });

      if (!response.success) {
        throw new Error(response.message || "Order not found");
      }

      const order = response.data;
      
      // Parse the items from the database format
      const itemNames = order.items_name_c ? order.items_name_c.split('\n') : [];
      const itemPrices = order.items_price_c ? order.items_price_c.split('\n') : [];
      const itemProductIds = order.items_product_id_c ? order.items_product_id_c.split('\n') : [];
      const itemQuantities = order.items_quantity_c ? order.items_quantity_c.split('\n') : [];
      const itemColors = order.items_selected_color_c ? order.items_selected_color_c.split('\n') : [];
      const itemSizes = order.items_selected_size_c ? order.items_selected_size_c.split('\n') : [];

      const items = itemNames.map((name, index) => ({
        name: name || '',
        price: parseFloat(itemPrices[index] || '0'),
        productId: parseInt(itemProductIds[index] || '0'),
        quantity: parseInt(itemQuantities[index] || '1'),
        selectedColor: itemColors[index] || '',
        selectedSize: itemSizes[index] || ''
      }));

      return {
        Id: order.Id,
        items: items,
        total: order.total_c,
        customerInfo: {
          name: order.customer_info_name_c,
          email: order.customer_info_email_c,
          address: order.customer_info_address_c
        },
        orderDate: order.order_date_c,
        status: order.status_c
      };
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      throw error;
    }
  },

  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.fetchRecords('order_c', {
        fields: [
          {"field": {"Name": "customer_info_name_c"}},
          {"field": {"Name": "customer_info_email_c"}},
          {"field": {"Name": "customer_info_address_c"}},
          {"field": {"Name": "items_name_c"}},
          {"field": {"Name": "items_price_c"}},
          {"field": {"Name": "items_product_id_c"}},
          {"field": {"Name": "items_quantity_c"}},
          {"field": {"Name": "items_selected_color_c"}},
          {"field": {"Name": "items_selected_size_c"}},
          {"field": {"Name": "order_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "total_c"}}
        ],
        orderBy: [{
          "fieldName": "order_date_c",
          "sorttype": "DESC"
        }]
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch orders");
      }

      return response.data.map(order => {
        // Parse the items from the database format
        const itemNames = order.items_name_c ? order.items_name_c.split('\n') : [];
        const itemPrices = order.items_price_c ? order.items_price_c.split('\n') : [];
        const itemProductIds = order.items_product_id_c ? order.items_product_id_c.split('\n') : [];
        const itemQuantities = order.items_quantity_c ? order.items_quantity_c.split('\n') : [];
        const itemColors = order.items_selected_color_c ? order.items_selected_color_c.split('\n') : [];
        const itemSizes = order.items_selected_size_c ? order.items_selected_size_c.split('\n') : [];

        const items = itemNames.map((name, index) => ({
          name: name || '',
          price: parseFloat(itemPrices[index] || '0'),
          productId: parseInt(itemProductIds[index] || '0'),
          quantity: parseInt(itemQuantities[index] || '1'),
          selectedColor: itemColors[index] || '',
          selectedSize: itemSizes[index] || ''
        }));

        return {
          Id: order.Id,
          items: items,
          total: order.total_c,
          customerInfo: {
            name: order.customer_info_name_c,
            email: order.customer_info_email_c,
            address: order.customer_info_address_c
          },
          orderDate: order.order_date_c,
          status: order.status_c
        };
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  }
};

export default orderService;