import React, { useState, useEffect } from 'react';
import TimeBar from './timeBar/timeBar';
import StatHoriz from './stat/stat';
import TypeSlider from './typeSlider/typeSlider';
import RoundStat from './roundStat/roundStat';
import SexChoice from './sexChoice/sexChoice';
import MlBar from './mlBar/mlBar';

import './stat.sass';

const MainPage = () => {
    return (
        <>
            <div>
                <RoundStat />
                <StatHoriz />
            </div> 
            <div>
                <MlBar />
                <TypeSlider />
                <TimeBar />
                <SexChoice />
            </div>
        </>
    )
}

export default MainPage;