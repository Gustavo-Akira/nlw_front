import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import heroImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import './styles.css';
import api from '../../services/api';
function Landing(){
    const [totalConnections, setTotalConnections] = useState(0);
    useEffect(()=>{
        api.get('/connections').then(result=>{
            const total = result.data;
            setTotalConnections(total);
            console.log(totalConnections);
        });
    },[])
    return (
        <div id="page-land">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online</h2>
                </div>
                <img src={heroImg} alt="Plataforma de estudos" className="hero-image"/>
                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassIcon} alt="Dar aulas"/>
                        Dar aulas
                    </Link>
                </div>
               <span className="total-connections">
                   Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="purple icon"/>
               </span>
            </div>
        </div>
    );
}
export default Landing;