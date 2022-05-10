import './App.css';
import React, {useEffect, useState} from 'react';
import CountryCard from "./components/CountryCard";
import Pagination from "./components/Pagination";
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    useEffect(() => {
        fetch('https://restcountries.com/v2/all?fields=name,region,area')
            .then(response => response.json())
            .then(data =>
                setData(data)
            );
    }, [])

    const [getData, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setsPostPerPage] = useState(10)

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = getData.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    function sort(order) {
        const sorted = getData.sort((a, b) => a.name.localeCompare(b.name))
        order === "reverse" ? setData([...sorted.reverse()]) : setData([...sorted])
    }
    function showSmaller() {
        const smaller = getData.filter(x => x.area < 65300)
        setData([...smaller])
    }
    function showOfOceania() {
        const inOceania = getData.filter(x => x.region === "Oceania")
        setData([...inOceania])
    }

    return (
        <Container fluid="lg p-5">
            <h1 className={'mb-4'}>Countries data</h1>
            <div className={'d-flex space-b mb-3'}>
                <div>
                    <button className={'me-3'} onClick={() => sort()}>A-Z</button>
                    <button onClick={() => sort("reverse")}>Z-A</button>
                </div>
                <div>
                    <button className={'me-3'} onClick={showSmaller}>Countries smaller that LT by area</button>
                    <button onClick={showOfOceania}>Countries in Oceania</button>
                </div>
            </div>
            <Pagination postsPerPage={postsPerPage} totalPosts={getData.length} paginate={paginate}/>
            <div>{currentPosts.map((country, i) => <CountryCard country={country} key={i}/>)}</div>
        </Container>
    );
}

export default App;
