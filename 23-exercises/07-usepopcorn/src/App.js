import { useEffect, useState } from 'react';
import StartRating from './StartRating';

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const APIKEY = 'b442b664';

// Task 1: Syncrhonising the query (piece of state) with movies (piece of state).
// Task 2: Allow users to select a movie from the list so they can see some details about the movie.
// Task 3: Load Movie Details based on the selected ID of a Movie.
// Task 4: Adding a Watched Movie.
// Task 5: Changing the page title with an Effect
// Task 6: Cleaning Up the Title
// Task 7: Cleaning Up Data Fetching
// Task 8: Listening to a Keypress
export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  // This piece of state contains an array of WatchedMovie objects with the data to be rendered in the WatchedMovieList
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // Create a new piece of state to store which movie ID have been selected
  const [selectedId, setSelectedId] = useState(null);

  function handleQuery(newQuery) {
    setQuery(newQuery);
  }

  function handleSelectMovie(id) {
    // setSelectedId(id);
    // If user make double click over the movie then the movie details dissapear to show the statistics
    // For this, if the selecteId is equal to the id then return null to dissapear the movie details else return the id to show the movie details
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // As soon as a new request is fired off then the previous one will stop.
  // Abort Controller.
  // Each that a new keystroke is added then the component is re-rendered, so the cleanup function is called and
  // abort the previous request (request cancel). However, JavaScript sees this as an error so JS will throw an error
  // that will be catched and render.
  useEffect(
    function () {
      // Step 1: Create an abort controller.
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError(''); // Always before start fetching for data, reset the error state.
          // Step 2: Connect the AbortController with the fetch function by passing a second argument which is an object with the signal property.
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!response.ok) {
            throw new Error('Something went wrong with fetching movies...');
          }

          const data = await response.json();

          if (data.Response === 'False') {
            throw new Error('Movie not found...');
          }

          setMovies(data.Search);
          // Step 5: Set the error to empty after the movies have been set
          setError('');
        } catch (err) {
          console.error(err.message);
          // Step 4: Fix the Abort Error by abort requests
          if (err.name !== 'AbortError') {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
          //  //
        }
      }

      // Fix the problem that when there isn't a search query (it is empty) then no error should be showed.
      // When the query is empty (initial render or not input user), it actually don't even go to search anything.
      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      fetchMovies();

      // Step 3: Define the cleanup function
      return function () {
        controller.abort();
      };
    },
    // query should be added to the dependency array in order to be track any change on the piece of state and execute the effect.
    [query]
  );

  return (
    <>
      <NavBar>
        <Search query={query} onQuery={handleQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>📛</span> {message}
    </p>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, onQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
      {/* Found <strong>X</strong> results */}
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

// Task 2: Create new component that will be displayed and render movie details when there is a selectedId (a movie is selected)
function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoadingMovieDetails, setIsLoadingMovieDetails] = useState(false);
  const [userRating, setUserRating] = useState(0);

  // Destructuring the MovieDetails to normalize variable names and use them in the JSX.
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  // Derived State to calculate if a movie was watched.
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  // watched.filter((movie) => movie.imdbID === selectedId).length === 1;

  // Derived State to get the user rating of a watched movie.
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  // Task 3: Whenever the movie details component is going to mount, fetch the movie details corresponding to the selected ID prop.
  //         Loading the currently selected movie each time that the component is mounted
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoadingMovieDetails(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&i=${selectedId}`
        );
        const data = await response.json();
        setMovieDetails(data);
        setIsLoadingMovieDetails(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  // Always use different effects for different things because each effect has only one purpose and it does one thing.
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      // A cleanup function is needed whenever the side effect that was introduced in the effect
      // keeps happening after the component has already been unmounted.
      // return () => (document.title = 'usePopcorn');
      return function () {
        document.title = 'usePopcorn';
        // Why this return the name of the movie if the clean up function runs after
        // the component has already been unmounted (dissapear from the component tree including states, etc.)?.
        // How will the function "remember" the value of the title variable?
        // This is caused for a closure. A closure means that a function will always remember all the variables
        // that were present at the time and the place data function was created
        // In the case of the cleanup function, it was created by the time the effect first was created. And so, by
        // that time the title was actually defined with a value. -> The cleanup function close over the title variable
        // so it will be remembered in the future even after the component has already unmounted.
        console.log(`Clean up effect for movie ${title}`);
      };
    },
    [title]
  );

  // As soon as the user press the ESC key then the MovieDetails component instance should be unmounted.
  // The way to react to a keypress event in an entire app is by attaching an event listener to the entire document.
  // Since this is a side effect because it is directly interacting with the DOM then the useEffect hook should be used.
  // Step 1: Create a new effect using the useEffect hook in the App component
  useEffect(
    function () {
      function callback(e) {
        if (e.code === 'Escape') {
          onCloseMovie();
          console.log('Closing...');
        }
      }
      // By doing some dome manipulations you are steping out of the React appplication
      // That's the reason of the useEffect hook should be used.
      // Step 2: Because the event listener should listen just when the MovieDetails component is mounted then move
      //         to that componet. By this, the event listener just is attached to the document when the MovieDetails
      //         component is actually mounted and present in the component tree.
      document.addEventListener('keydown', callback);

      // In this effect the cleanup functions prevents that:
      // - Each time the MovieDetails component is mounted then a new event listener is attached to the document.
      // - Therefore, without the cleanup function to remove them, perfomance issues could appear by accumulate
      //   all the attached event listeners to the document.
      // As soon as the MovieDetails component unmounts, the event listener will then be removed from the document.
      // With this, the event listener just be executed once.
      return function () {
        // The callback function passed to remove the event listener should be the same that was passed to the
        // add event listener.
        document.removeEventListener('keydown', callback);
      };
    },
    [onCloseMovie]
  );

  return (
    <div className="details">
      {isLoadingMovieDetails ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StartRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {/* When the user add the watched movie to the list, then the current movie selected is unselected */}
                  {/* Just allow to the user to add a watched movie if the user has rated the movie */}
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You already rated this movie with {watchedUserRating}{' '}
                  <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(2);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(2);
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => onDeleteWatched(movie.imdbID)}
      >
        X
      </button>
    </li>
  );
}
