import React from 'react';

const Footer = () => {
    const current_year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className='text-center'>
                <p className="mt-4">Copyright © {current_year}, ChomCHOB. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
