
import React, { useEffect, useState } from "react";
import serach from '../images/search-interface-symbol.png' 
import Card from "./Card";
let API_key = '&api_key=db95773a7fb212ba790d71f6adac0e7e'
let base_url = 'https://api.themoviedb.org/3';
let url = base_url + '/discover/movie?sort_by=popularity.desc' + API_key;
let arr = ['Popular','Theatre','Kids','Drama','Comedie']

const Main = () => {
    const [movieData,setData] = useState([])
    const [url_set,setUrl] = useState(url)
    const [search,setSeach] = useState()


    useEffect(()=> {
        fetch(url_set)
        .then(res => res.json())
        .then(data => {
            setData(data.results)
        })
    },[url_set])

    const getData = (movieType) => {
        if(movieType == 'Popular')
            {
                url = base_url + '/discover/movie?sort_by=popularity.desc' + API_key;   
                console.log('as')
            }
            if(movieType == 'Theatre'){
                url = base_url + '/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22' + API_key;                   
            }
            if(movieType == 'Kids'){
                url = base_url + '/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc' + API_key;                   
            }
            if(movieType == 'Drama'){
                url = base_url + '/discover/movie?with_genres=18&primary_release_year=2014' + API_key;                   
            }
            if(movieType == 'Comedie'){
                url = base_url + '/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc' + API_key;                   
            }        
            setUrl(url)
    }

    const searchMovie  = (ev) => {
        ev.preventDefault()
        console.log(ev);
            url = base_url + '/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=' + search
            setUrl(url)
            setSeach(" ")
    }

    return (
        <>
            <div className="header">
                <nav>
                    <ul>
                        {
                            arr.map((value,pos)=> { 
                                return (
                                    <li key={pos}><a href="#" name={value} onClick={(e) => {getData(e.target.name)}} >{value}</a></li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <form onSubmit={searchMovie}>
                    <div className="search-btn">
                        <input type="text" placeholder="Enter Movie Name" className="inputText" onChange={(e) => { setSeach(e.target.value) }} value={search} 
                       />
                        <button> <img src={serach} alt="" /> </button>
                    </div>
                </form>
            </div>
            <div className="container"> 
                {
                    (movieData?.length == 0) ? <p className='notfound'>Not found</p> : movieData?.map((res,pos)=> {
                        return(
                            <Card info={res} key={pos}  />
                        )
                    })
                }
            </div>
        </>
    )
}
export default Main;