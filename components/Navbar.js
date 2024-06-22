import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { usePokeball } from '@/contexts/pokeballcontext';

export default function Navbar() {
    const { pokeball } = usePokeball();
    const pokeballCount = pokeball.length > 0 ? pokeball.length : 0;
    const [searchTerm, setSearchTerm] = useState('');
    console.log(searchTerm)
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            router.push({
                pathname: '/',
                query: { search: searchTerm }
            });
        }
        else {
            setSearchTerm('');
            router.push({
                pathname: '/',
                query: {}
            });
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        router.push({
            pathname: '/',
            query: {}
        });
    };

    return (
        <nav className="navbar">
            <div className="top-bar">
                <span>Welcome to Pokemon shop!</span>
                <div className="top-bar-links">
                    <Link href="#">
                        <img src="/icons/Contact_123456.png" alt="Contact" className="icon" /> Contact 123456
                    </Link>
                    <span className="mx-4">|</span>
                    <Link href="#">
                        <img src="/icons/Track_your_order.png" alt="Track" className="icon" /> Track your order
                    </Link>
                    <span className="mx-4">|</span>
                    <Link href="#">
                        <img src="icons/All_offers.png" alt="Offers" className="icon" /> All Offers
                    </Link>
                </div>
            </div>
            <div className="main-bar">
                <div className="logo">
                    <Link href="/">
                        <img src="/Pokemon_logo.png" width="150px" alt="Pokemon Logo" />
                    </Link>
                </div>
                <div className="search-bar">
                    <form onSubmit={handleSearch} className="relative w-full ml-20 mr-20">
                        <input
                            type="text"
                            className="search-input w-full text-[#666666]"
                            placeholder="Search name Pokémon ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={handleClearSearch}
                            >
                                <img src="/icons/delete.png" alt="Clear" className="icon w-4 h-4" />
                            </button>
                        )}
                    </form>
                </div>
                <div className="user-actions flex items-center">
                    <Link href="#" className="flex items-center">
                        <img src="icons/Username.png" alt="Username" className="icon" />
                        <span className="ml-2">Username</span>
                    </Link>
                    <span className="mx-4" style={{ color: '#D9D9D9' }}>|</span>
                    <Link href="../pokeball" className="flex items-center relative">
                        <div className="relative">
                            <img src="icons/Pocket.png" alt="Pocket" className="icon" />
                            <div className="absolute top-0 right-0 bg-black text-white rounded-full h-4 w-4 flex items-center justify-center" style={{ color: '#F9F9F9' }}>
                                {pokeballCount > 0 ? pokeballCount : 0}
                            </div>
                        </div>
                        <span className="ml-2">Pocket</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
