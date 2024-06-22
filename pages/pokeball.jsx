import React from 'react';
import { usePokeball } from '../contexts/pokeballcontext';

const Pokeball = () => {
    const { pokeball, removeFromPokeball } = usePokeball(); // ใช้ removeFromPokeball จาก Context

    const totalQuantity = pokeball.reduce((total, item) => total + item.quantity, 0);

    const handleRemoveFromPokeball = (id) => {
        removeFromPokeball(id);
    };

    const handleCheckout = () => {
        alert("ขอบคุณที่ใช้เว็บไซต์ของเรา");
    };

    return (
        <div className="flex justify-between pl-[180px] py-16">
            <div className="flex-grow pr-4">
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                        <div className="px-4 py-4 text-left">
                            <h1 className="text-2xl font-bold pl-4 py-4">Pocket list ({pokeball.length})</h1>
                        </div>
                        <tr>
                            <th className="px-8 py-4 text-left">Product Name</th>
                            <th className="px-8 py-4">Quantity</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokeball.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-4">Your pocket is empty.</td>
                            </tr>
                        ) : (
                            pokeball.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-6 py-10 flex items-center">
                                        <img src={item.sprites.other['official-artwork'].front_default} alt={item.name} className="w-20 h-20 mr-4" />
                                        <div>
                                            <h2 className="text-lg font-bold capitalize">{item.name}</h2>
                                            <div className="flex">
                                                {item.types.map((type, index) => (
                                                    <span key={index} className="text-sm font-semibold px-2 py-1 rounded mr-2 capitalize" style={{ fontSize: '16px', backgroundColor: '#FFF4E3', color: '#FFAE33' }}>
                                                        {type.type.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-2 py-2 text-center">{item.quantity}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button onClick={() => handleRemoveFromPokeball(item.id)}>
                                            <img src="/icons/bin.png" alt="Delete" className="w-6 h-6" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="w-[300px] flex flex-col ml-10 mr-10">
                <div className="bg-yellow-50 p-4 rounded-t-lg">
                    <h2 className="text-lg font-bold">Order Summary</h2>
                </div>
                <div className="bg-white p-6 rounded-b-lg">
                    <div className="flex justify-between mb-2 p-2 rounded-lg">
                        <span className="text-[#484848]">Subtotal</span>
                        <span className="text-[#373737] font-bold">{pokeball.length} Product{pokeball.length > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between mb-4 p-2 rounded-lg">
                        <span className="text-[#484848]">Quantity</span>
                        <span className="text-[#373737] font-bold">{totalQuantity} Quantity</span>
                    </div>
                    <div className=" rounded-b-lg">
                        <button className="w-full py-2 rounded-lg" style={{ fontSize: '16px', backgroundColor: '#FF6F61', color: '#F9F9F9' }} onClick={handleCheckout}>Proceed To Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pokeball;
