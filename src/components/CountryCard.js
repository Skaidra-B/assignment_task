import React from 'react';

const CountryCard = ({country}) => {
    return (
        <div className={'country-card'}>
            <h3>{country.name}</h3>
            <div>Region: {country.region}</div>
            <div>Area: {country.area}</div>
        </div>
    );
};

export default CountryCard;