import React, { createContext, useContext, useState } from 'react';

// สร้าง Context
const PokeballContext = createContext();

// สร้าง Hook สำหรับใช้ Context
export const usePokeball = () => {
    return useContext(PokeballContext);
};

// สร้าง Provider เพื่อจัดการกับสถานะและฟังก์ชันสำหรับตระกร้า
export const PokeballProvider = ({ children }) => {
    const [pokeball, setPokeball] = useState([]);

    // ฟังก์ชันสำหรับเพิ่ม Pokemon เข้าตระกร้า
    const addToPokeball = (pokemon) => {
        setPokeball((prevPokeball) => {
            const existingPokemon = prevPokeball.find(item => item.id === pokemon.id);
            if (existingPokemon) {
                return prevPokeball.map(item =>
                    item.id === pokemon.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevPokeball, { ...pokemon, quantity: 1 }];
            }
        });
    };

    // ฟังก์ชันสำหรับลบ Pokemon ออกจากตระกร้า
    const removeFromPokeball = (id) => {
        setPokeball((prevPokeball) => prevPokeball.filter(item => item.id !== id));
    };

    // ฟังก์ชันสำหรับเคลียร์ตระกร้า
    const clearPokeball = () => {
        setPokeball([]);
    };

    return (
        <PokeballContext.Provider value={{ pokeball, addToPokeball, removeFromPokeball, clearPokeball }}>
            {children}
        </PokeballContext.Provider>
    );
};
