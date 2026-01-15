
import { Product, Order, Review, Article, Settings, Category, User } from '../types';

const STORAGE_KEY = 'nexus_admin_db';

interface Database {
  products: Product[];
  categories: Category[];
  orders: Order[];
  reviews: Review[];
  articles: Article[];
  users: User[];
  settings: Settings;
}

const loadDb = (): Database => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);
  return {
    products: [],
    categories: [],
    orders: [],
    reviews: [],
    articles: [],
    users: [],
    settings: {
      logo: '',
      favicon: '',
      socialLinks: {},
      businessName: 'Nexus Admin',
      supportEmail: '',
      paymentPhoneNumber: '',
      address: '',
      theme: {
        primaryColor: '#4f46e5',
        secondaryColor: '#0f172a'
      }
    }
  };
};

const saveDb = (db: Database) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export class ApiService {
  static async getProducts(): Promise<Product[]> {
    return loadDb().products;
  }
  static async saveProduct(product: Product): Promise<void> {
    const db = loadDb();
    const index = db.products.findIndex(p => p.id === product.id);
    if (index > -1) db.products[index] = product;
    else db.products.push(product);
    saveDb(db);
  }
  static async deleteProduct(id: string): Promise<void> {
    const db = loadDb();
    db.products = db.products.filter(p => p.id !== id);
    saveDb(db);
  }

  static async getOrders(): Promise<Order[]> {
    return loadDb().orders;
  }
  static async updateOrder(order: Order): Promise<void> {
    const db = loadDb();
    const index = db.orders.findIndex(o => o.id === order.id);
    if (index > -1) db.orders[index] = order;
    saveDb(db);
  }

  static async getReviews(): Promise<Review[]> {
    return loadDb().reviews;
  }
  static async saveReview(review: Review): Promise<void> {
    const db = loadDb();
    const index = db.reviews.findIndex(r => r.id === review.id);
    if (index > -1) db.reviews[index] = review;
    else db.reviews.push(review);
    saveDb(db);
  }
  static async updateReview(review: Review): Promise<void> {
    const db = loadDb();
    const index = db.reviews.findIndex(r => r.id === review.id);
    if (index > -1) db.reviews[index] = review;
    saveDb(db);
  }
  static async deleteReview(id: string): Promise<void> {
    const db = loadDb();
    db.reviews = db.reviews.filter(r => r.id !== id);
    saveDb(db);
  }

  static async getArticles(): Promise<Article[]> {
    return loadDb().articles;
  }
  static async saveArticle(article: Article): Promise<void> {
    const db = loadDb();
    const index = db.articles.findIndex(a => a.id === article.id);
    if (index > -1) db.articles[index] = article;
    else db.articles.push(article);
    saveDb(db);
  }
  static async deleteArticle(id: string): Promise<void> {
    const db = loadDb();
    db.articles = db.articles.filter(a => a.id !== id);
    saveDb(db);
  }

  static async getUsers(): Promise<User[]> {
    return loadDb().users;
  }
  static async saveUser(user: User): Promise<void> {
    const db = loadDb();
    const index = db.users.findIndex(u => u.id === user.id);
    if (index > -1) db.users[index] = user;
    else db.users.push(user);
    saveDb(db);
  }
  static async deleteUser(id: string): Promise<void> {
    const db = loadDb();
    db.users = db.users.filter(u => u.id !== id);
    saveDb(db);
  }

  static async getCategories(): Promise<Category[]> {
    return loadDb().categories;
  }
  static async saveCategory(category: Category): Promise<void> {
    const db = loadDb();
    const index = db.categories.findIndex(c => c.id === category.id);
    if (index > -1) db.categories[index] = category;
    else db.categories.push(category);
    saveDb(db);
  }
  static async deleteCategory(id: string): Promise<void> {
    const db = loadDb();
    const isUsed = db.products.some(p => p.categoryId === id);
    if (isUsed) throw new Error("Category cannot be deleted as it is assigned to one or more products.");
    db.categories = db.categories.filter(c => c.id !== id);
    saveDb(db);
  }

  static async getSettings(): Promise<Settings> {
    return loadDb().settings;
  }
  static async updateSettings(settings: Settings): Promise<void> {
    const db = loadDb();
    db.settings = settings;
    saveDb(db);
  }

  static initialize() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        fetch('mockData.json')
          .then(res => res.json())
          .then(data => saveDb(data))
          .catch(() => {});
    }
  }
}
