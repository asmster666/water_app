import React, { useState, useEffect } from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import './typeSlider.sass';

const TypeSlider = () => {

    const images = [
        { url: '../../img/water.jpg' },
        { url: '../../img/yoghurt.jpg' },
        { url: '../../img/tea.jpeg' },
        { url: '../../img/milk.jpeg' },
        { url: '../../img/juice.png' },
        { url: '../../img/coffee.jpg' }
    ];

    return ( 
        <div className="type_scroll">
            <SimpleImageSlider 
                style={{ marginTop: '0.5rem', height: '100%', width: '100%' }}
                images={images}
            />
        </div>
    )
}

export default TypeSlider;