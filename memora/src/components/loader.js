import React from 'react';
import './loader.css'
import Footer from './footer';
import Navbar from './Navbar';

function Loader () { 
    return (
    <div>
        <Navbar />
        <body>
            <div id="root">
            <div class="loader-container">
                <div class="loader">
                <div class="sk-chase">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                </div>
                </div>
            </div>
            </div>
        </body>
        <Footer />
    </div>
            
)};

export default Loader;