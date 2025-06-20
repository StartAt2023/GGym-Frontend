import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../store/CartContext';

const mockProducts = [
  {
    id: 1,
    name: 'Professional Dumbbell Set',
    price: 299,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61',
    category: 'strength',
    description: 'Professional dumbbell set with multiple weight options, perfect for various training needs'
  },
  {
    id: 2,
    name: 'Multi-functional Treadmill',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
    category: 'cardio',
    description: 'Smart treadmill with multiple training modes and heart rate monitoring'
  },
  {
    id: 3,
    name: 'Yoga Mat Set',
    price: 199,
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2',
    category: 'yoga',
    description: 'Eco-friendly yoga mat with non-slip surface, includes yoga blocks and stretch bands'
  },
  // ... 其他产品 ...
];

const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const product = mockProducts.find(p => p.id === Number(id));

  if (!product) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Product not found.</div>;
  }

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 32 }}>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <img src={product.image} alt={product.name} style={{ width: 320, height: 320, objectFit: 'cover', borderRadius: 8 }} />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 32, marginBottom: 16 }}>{product.name}</h2>
          <p style={{ color: '#888', marginBottom: 8 }}>Category: {product.category}</p>
          <p style={{ fontSize: 24, fontWeight: 600, color: '#2d3748', marginBottom: 16 }}>${product.price}</p>
          <p style={{ marginBottom: 24 }}>{product.description}</p>
          <button style={{ padding: '1rem 2rem', background: '#4299e1', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, fontSize: 18, cursor: 'pointer' }} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 