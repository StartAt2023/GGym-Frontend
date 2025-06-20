import type { FC } from 'react';
import { useEffect, useState } from 'react';
import api from '../services/api';
import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface AdminProductsProps {
  user: { username: string; email: string; role?: string };
}

const AdminProducts: FC<AdminProductsProps> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    quantity: '',
    description: ''
  });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(() => setError('Failed to fetch products'))
      .finally(() => setLoading(false));
  }, [user]);

  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setAddError(null);
    try {
      const payload = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        image: newProduct.image,
        quantity: parseInt(newProduct.quantity, 10),
        description: newProduct.description
      };
      await api.post('/products', payload);
      setNewProduct({ name: '', price: '', image: '', quantity: '', description: '' });
      // 刷新商品列表
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err: any) {
      setAddError(err.response?.data?.message || 'Failed to add product');
    } finally {
      setAdding(false);
    }
  };

  if (user?.role !== 'admin') {
    return <div style={{ padding: 32, textAlign: 'center' }}>No permission.</div>;
  }

  if (loading) return <div style={{ padding: 32, textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ padding: 32, textAlign: 'center', color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>Admin Product Management</h2>
      <form onSubmit={handleAddProduct} style={{ marginBottom: 32, background: '#f8f9fa', padding: 24, borderRadius: 8 }}>
        <h3 style={{ marginBottom: 16 }}>Add New Product</h3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleNewProductChange}
            required
            style={{ flex: 1, minWidth: 180, padding: 8 }}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleNewProductChange}
            required
            step="0.01"
            style={{ flex: 1, minWidth: 120, padding: 8 }}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleNewProductChange}
            required
            style={{ flex: 2, minWidth: 220, padding: 8 }}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={handleNewProductChange}
            required
            style={{ flex: 1, minWidth: 100, padding: 8 }}
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleNewProductChange}
          required
          style={{ width: '100%', marginTop: 12, padding: 8, minHeight: 60, resize: 'vertical' }}
        />
        <button type="submit" disabled={adding} style={{ marginTop: 16, padding: '10px 32px', background: '#4299e1', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
          {adding ? 'Adding...' : 'Add Product'}
        </button>
        {addError && <div style={{ color: 'red', marginTop: 8 }}>{addError}</div>}
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: 12, border: '1px solid #eee' }}>ID</th>
            <th style={{ padding: 12, border: '1px solid #eee' }}>Name</th>
            <th style={{ padding: 12, border: '1px solid #eee' }}>Category</th>
            <th style={{ padding: 12, border: '1px solid #eee' }}>Price</th>
            <th style={{ padding: 12, border: '1px solid #eee' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td style={{ padding: 12, border: '1px solid #eee' }}>{product.id}</td>
              <td style={{ padding: 12, border: '1px solid #eee' }}>{product.name}</td>
              <td style={{ padding: 12, border: '1px solid #eee' }}>{product.category}</td>
              <td style={{ padding: 12, border: '1px solid #eee' }}>${product.price}</td>
              <td style={{ padding: 12, border: '1px solid #eee' }}>
                {/* 后续补充编辑/删除按钮 */}
                <button style={{ marginRight: 8 }}>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts; 