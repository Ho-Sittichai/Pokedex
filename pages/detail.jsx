import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { usePokeball } from '@/contexts/pokeballcontext';

const PokemonDetailPage = () => {
    const router = useRouter();
    const { query } = router;
    const { pokeball, addToPokeball } = usePokeball();
    const [quantity, setQuantity] = useState(1);
    const [addToPocketMessage, setAddToPocketMessage] = useState('');

    const pokemon = query.pokemon ? JSON.parse(query.pokemon) : {};

    const handleAddToPokeball = () => {
        for (let i = 0; i < quantity; i++) {
            addToPokeball(pokemon);
        }
        setAddToPocketMessage(`Added ${quantity} ${pokemon.name}(s) to your pocket.`);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setAddToPocketMessage('');
        }, 3000); // ล้างข้อความเมื่อเวลาผ่านไป 3 วินาที

        return () => clearTimeout(timer);
    }, [addToPocketMessage]);

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    return (
        <div className="px-[180px]">
            <button onClick={() => router.back()} className="flex items-center text-gray-600 mb-4 pt-10" style={{ color: '#373737' }}>
                <img src="/icons/back.png" alt="Back Icon" className="h-5 w-5 mr-2" />
                <span>Back</span>
            </button>
            <div className="rounded-lg bg-white mx-auto mt-8 w-full max-w-none">
                <div className="flex">
                    <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="w-full md:w-72 h-auto object-contain mx-auto md:ml-0 md:mr-20" />
                    <div className="ml-16 flex flex-col justify-between">
                        <div className='mb-2'>
                            <h1 className="text-2xl font-bold capitalize" style={{ color: '#373737' }}>{pokemon.name}</h1>
                            <div className="flex space-x-2 my-2">
                                {pokemon.types.map((type, index) => (
                                    <div key={index} className="rounded-lg px-2 py-1 text-sm font-semibold capitalize" style={{ fontSize: '16px', backgroundColor: '#FFF4E3', color: '#FFAE33' }}>
                                        {type.type.name}
                                    </div>
                                ))}
                            </div>
                            <div className="my-4">
                                <p className="mb-2" style={{ color: '#373737' }}>
                                    Stats:
                                    <span style={{ marginLeft: '40px' }}>
                                        {pokemon.stats.map(stat => stat.stat.name).join(', ')}
                                    </span>
                                </p>
                                <p className="text-gray-700 capitalize" style={{ color: '#373737' }}>
                                    Abilities:
                                    <span style={{ marginLeft: '20px' }}>
                                        {pokemon.abilities.map(ability => ability.ability.name).join(', ')}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center pb-6">
                            <span className="mr-2 text-lg" style={{ color: '#373737' }}>Quantity:</span>
                            <div className="pl-16">
                                <div className="flex rounded-md border-2 border-black">
                                    <button onClick={decrementQuantity} className="px-4  border rounded-l-md" style={{ color: '#373737' }}>-</button>
                                    <span className="px-6 py-2 border-t border-b" style={{ color: '#484848', backgroundColor: '#F5F5F5' }}>{quantity}</span>
                                    <button onClick={incrementQuantity} className="px-4  border rounded-r-md" style={{ color: '#373737' }}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center pb-14">
                            <button onClick={handleAddToPokeball} className="flex items-center justify-center w-full md:w-72 bg-red-500 text-white py-3 rounded-lg text-lg" style={{ backgroundColor: '#FF6F61', color: '#F9F9F9' }}>
                                <img src="/icons/cart.png" alt="Add Pocket" className="h-6 w-6 mr-2" />
                                Add To Pocket
                            </button>
                            {addToPocketMessage && (
                                <div className="ml-4 text-green-500">{addToPocketMessage}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetailPage;
