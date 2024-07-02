import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const pizzas = [
  {
    name: 'Margherita',
    desc: 'Salcë e marinuar, susam, djathë proper, mozzarella, fior di late, vaj ulliri, borzilok i freskët',
    price: 450,
    imgUrl: '/img/margarita.png'
  },
  {
    name: 'Loca',
    desc: 'Salcë e marinuar, susam, djathë proper, sallam napoletan, loca sauce',
    price: 640,
    imgUrl: '/img/loca.png'
  },
  {
    name: 'Chicken Barbeque',
    desc: 'Salcë e marinuar, susam, djathë proper, proshutë proper, copëza pule, barbeque sos, herba cipolini',
    price: 680,
    imgUrl: '/img/barbeque.png'
  },
  {
    name: 'Pepperoni',
    desc: 'Salcë e marinuar, susam, djathë proper, pepperoni, mozzarella, kripe e speca.',
    price: 600,
    imgUrl: '/img/pepperoni.png'
  },
  {
    name: 'Vegjetariane',
    desc: 'Salcë e marinuar, susam, djathë proper, kunguj, perime te mbushura me speca',
    price: 570,
    imgUrl: '/img/vegjetariane.png'
  },
  {
    name: 'Ham & Mushroom',
    desc: 'Salcë e marinuar, susam, djathë proper, kunguj te mbushur me hudher te pjekur',
    price: 590,
    imgUrl: '/img/hamMushroms.png'
  },
  {
    name: 'Kater Djathrat',
    desc: 'Salcë e marinuar, susam, djathë proper, katër djathë, hudher te pjekur',
    price: 620,
    imgUrl: '/img/kater.png'
  },
  {
    name: 'Pizza Bacon',
    desc: 'Salcë e marinuar, susam, djathë proper, bacon, domate, hudher e pjekur',
    price: 680,
    imgUrl: '/img/bacon.png'
  },
  {
    name: 'Pizza Tuna',
    desc: 'Salcë e marinuar, susam, djathë proper, tuna, hudher, salcDomate e pjekur',
    price: 660,
    imgUrl: '/img/tuna.png'
  },
  {
    name: 'Rukola Parmigiano Crudo',
    desc: 'Salcë e marinuar, susam, djathë proper, rukola, parmesan, hudher te pjekur',
    price: 690,
    imgUrl: '/img/rukola.png'
  },
];

const PizzaList = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(pizzas.reduce((acc, pizza) => ({ ...acc, [pizza.name]: 1 }), {}));
  const [sizes, setSizes] = useState(pizzas.reduce((acc, pizza) => ({ ...acc, [pizza.name]: 'Medium' }), {}));

  const handleQuantityChange = (pizzaName, qty) => {
    setQuantities({ ...quantities, [pizzaName]: qty });
  };

  const handleSizeChange = (pizzaName, size) => {
    setSizes({ ...sizes, [pizzaName]: size });
  };

  const handleOrder = (pizza) => {
    const quantity = quantities[pizza.name];
    const size = sizes[pizza.name];
    alert(`Porosia për ${pizza.name} u krye me sasi ${quantity} dhe madhësi ${size}`);
  };

  return (
    <div className="pizza-list">
      {pizzas.map((pizza, index) => (
        <div key={index} className="pizza-item">
          <div className="pizza-details">
            <h3>{pizza.name}</h3>
            <p>{pizza.desc}</p>
            <p>Price: {pizza.price} L</p>
            <div>
              <select
                value={sizes[pizza.name]}
                onChange={(e) => handleSizeChange(pizza.name, e.target.value)}
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
          </div>
          <div>
            <img src={pizza.imgUrl} alt={pizza.name} className="pizza-img" />
          </div>
          <div>
            <label htmlFor="">Sasia: </label>
            <input
              type="number"
              min="1"
              value={quantities[pizza.name]}
              onChange={(e) => handleQuantityChange(pizza.name, e.target.value)}
            />
            <button id='btn' onClick={() => handleOrder(pizza)}>Porosit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PizzaList;
