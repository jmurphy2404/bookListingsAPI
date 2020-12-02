import React, {useState, useEffect} from 'https://cdn.skypack.dev/react@v17.0.1';
import ReactDOM from 'https://cdn.skypack.dev/react-dom@v17.0.1';

// see https://repl.it/@Dotdash/Goodreads-Server-Express for implementation details

const Header = (props) => {
  return (
    <header className="App-header">
      <h2>{props.text}</h2>
    </header>
  );
};

const Book = ({book}) => {
  return(
    <div className="book">
      <img className="cover" src={book.imageUrl} /><h2><span className="title">{book.title}</span> by {book.authorName}, published in {book.year._}</h2>
    </div>
  )
};

const Search = (props) => {
  const [term, setTerm] = useState("");
  
  const handleSearchChanges = (e) => {
    setTerm(e.target.value);
  }
  
  const resetInput = () => {
    setTerm("");
  }
  
  const callSearch = (e) => {
    e.preventDefault();
    props.search(term);
    resetInput();
    }

  return(
  <form className="search">
    <input
      value={term}
      onChange={handleSearchChanges}
      type="text"
    />
    <input onClick={callSearch} type="submit" value="SEARCH" />
  </form>
    );
};

const apiUrl = `https://Goodreads-Server-Express.jmurphy2404.repl.co/search`

const App = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
    
  useEffect(() => {
    fetch(`apiURL`)
      .then(response => response.json())
      .then(jsonResponse => {
        setBooks(jsonResponse.list);
        setLoading(false);
    });
}, []);
  
  const search = term => {

    setLoading(true);
    setError(null);
    
    fetch(`https://Goodreads-Server-Express.jmurphy2404.repl.co/search/${term}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if(jsonResponse){
          console.log(jsonResponse.list)
          setBooks(jsonResponse.list);
          //console.log(books);
          setLoading(false);
        }else{
          //console.log(jsonResponse)
          setError(jsonResponse.Error);
          setLoading(false);
        }
     });
  };

  return(
    <div className="App">
      <Header text="Book Search" />
      <Search search={search} />
      <p className="App-intro">Search for your choice in book!</p>
      <div className="books">
        {loading && !error ? (
         <span>loading...</span>
         ) : error ? (
          <div className="error">{error}</div>
        ) : (
          books.map((book, index) => (
            <div className="resultsContainer">
              <label className="numberLabel">{index+1}.</label><Book book={book} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
  





ReactDOM.render(<App />, document.getElementById("app"));