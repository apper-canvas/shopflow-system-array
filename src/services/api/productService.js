import { getApperClient } from "@/services/apperClient";

const productService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "stock_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}}
        ]
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch products");
      }

      return response.data.map(product => ({
        Id: product.Id,
        name: product.name_c,
        description: product.description_c,
        price: product.price_c,
        category: product.category_c,
        images: product.images_c ? product.images_c.split('\n').filter(url => url.trim()) : [],
        rating: product.rating_c,
        reviewCount: product.review_count_c,
        stock: product.stock_c,
        sizes: product.sizes_c ? product.sizes_c.split(',').map(s => s.trim()) : [],
        colors: product.colors_c ? product.colors_c.split(',').map(c => c.trim()) : []
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.getRecordById('product_c', parseInt(id), {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "stock_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}}
        ]
      });

      if (!response.success) {
        throw new Error(response.message || "Product not found");
      }

      const product = response.data;
      return {
        Id: product.Id,
        name: product.name_c,
        description: product.description_c,
        price: product.price_c,
        category: product.category_c,
        images: product.images_c ? product.images_c.split('\n').filter(url => url.trim()) : [],
        rating: product.rating_c,
        reviewCount: product.review_count_c,
        stock: product.stock_c,
        sizes: product.sizes_c ? product.sizes_c.split(',').map(s => s.trim()) : [],
        colors: product.colors_c ? product.colors_c.split(',').map(c => c.trim()) : []
      };
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  async getByCategory(category) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      let params = {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "stock_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}}
        ]
      };

      if (category !== "all") {
        params.where = [{
          "FieldName": "category_c",
          "Operator": "EqualTo",
          "Values": [category]
        }];
      }

      const response = await apperClient.fetchRecords('product_c', params);

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch products by category");
      }

      return response.data.map(product => ({
        Id: product.Id,
        name: product.name_c,
        description: product.description_c,
        price: product.price_c,
        category: product.category_c,
        images: product.images_c ? product.images_c.split('\n').filter(url => url.trim()) : [],
        rating: product.rating_c,
        reviewCount: product.review_count_c,
        stock: product.stock_c,
        sizes: product.sizes_c ? product.sizes_c.split(',').map(s => s.trim()) : [],
        colors: product.colors_c ? product.colors_c.split(',').map(c => c.trim()) : []
      }));
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },

  async search(query) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "stock_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {
                  "fieldName": "name_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ],
              "operator": "OR"
            },
            {
              "conditions": [
                {
                  "fieldName": "description_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ],
              "operator": "OR"
            },
            {
              "conditions": [
                {
                  "fieldName": "category_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ],
              "operator": "OR"
            }
          ]
        }]
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to search products");
      }

      return response.data.map(product => ({
        Id: product.Id,
        name: product.name_c,
        description: product.description_c,
        price: product.price_c,
        category: product.category_c,
        images: product.images_c ? product.images_c.split('\n').filter(url => url.trim()) : [],
        rating: product.rating_c,
        reviewCount: product.review_count_c,
        stock: product.stock_c,
        sizes: product.sizes_c ? product.sizes_c.split(',').map(s => s.trim()) : [],
        colors: product.colors_c ? product.colors_c.split(',').map(c => c.trim()) : []
      }));
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },

  async getFeatured() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error("ApperClient not available");
      }

      const response = await apperClient.fetchRecords('product_c', {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "stock_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}}
        ],
        where: [{
          "FieldName": "rating_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [4.5]
        }],
        orderBy: [{
          "fieldName": "rating_c",
          "sorttype": "DESC"
        }],
        pagingInfo: {
          "limit": 8,
          "offset": 0
        }
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to fetch featured products");
      }

      return response.data.map(product => ({
        Id: product.Id,
        name: product.name_c,
        description: product.description_c,
        price: product.price_c,
        category: product.category_c,
        images: product.images_c ? product.images_c.split('\n').filter(url => url.trim()) : [],
        rating: product.rating_c,
        reviewCount: product.review_count_c,
        stock: product.stock_c,
        sizes: product.sizes_c ? product.sizes_c.split(',').map(s => s.trim()) : [],
        colors: product.colors_c ? product.colors_c.split(',').map(c => c.trim()) : []
      }));
    } catch (error) {
      console.error("Error fetching featured products:", error);
      throw error;
    }
  }
};

export default productService;