| **Jikan API** | Get anime details from MyAnimeList. | `https://api.jikan.moe/v4/anime?limit=4&order_by=score&sort=desc` |
 

### **General APIs**
| API | Description | Example Endpoint |
|------|------------|-----------------|
| **OMDb API** | Get movie details. | `https://www.omdbapi.com/?i=tt3896198&apikey=YOUR_API_KEY` |
| **Fake Store API** | E-commerce products. | `https://fakestoreapi.com/products` |
| **Random User API** | Generates random user profiles. | `https://randomuser.me/api/?results=4` |
| **GitHub API** | Get GitHub user info. | `https://api.github.com/users/octocat` |
| **Harvard Art API** | Access artworks from Harvard Museum. | `https://api.harvardartmuseums.org/object?apikey=YOUR_API_KEY&size=4` |
| **Public APIs** | Directory of public APIs. | `https://api.publicapis.org/entries` |
| **NASA API** | Access NASA data, including images. | `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY` |
| **Open Library API** | Access book data. | `https://openlibrary.org/api/books?bibkeys=ISBN:0451526538&format=json` |
| **CoinGecko API** | Cryptocurrency data. | `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd` |
| **News API** | Get news articles. | `https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY` |

---

### **Entertainment & Fun**
| API | Description | Example Endpoint |
|------|------------|-----------------|
| **Jikan API** | Get anime details from MyAnimeList. | `https://api.jikan.moe/v4/anime?limit=4&order_by=score&sort=desc` |
| **Quotable API** | Get random inspirational quotes. | `https://api.quotable.io/random` |
| **JokeAPI** | Get random jokes. | `https://v2.jokeapi.dev/joke/Any?type=single` |
| **Trivia API** | Get random trivia questions. | `https://opentdb.com/api.php?amount=1&type=multiple` |
| **TVMaze API** | TV show and episode data. | `https://api.tvmaze.com/shows/1` |
| **PokéAPI** | Pokémon data. | `https://pokeapi.co/api/v2/pokemon/1` |
| **Studio Ghibli API** | Studio Ghibli film data. | `https://ghibliapi.vercel.app/films` |
| **Numbers API** | Fun facts about numbers. | `http://numbersapi.com/42` |
| **Chuck Norris API** | Chuck Norris jokes. | `https://api.chucknorris.io/jokes/random` |
| **Bible API** | Bible verses. | `https://bible-api.com/john+3:16` |

---

### **Animals & Nature**
| API | Description | Example Endpoint |
|------|------------|-----------------|
| **Dog CEO API** | Get random dog images. | `https://dog.ceo/api/breeds/image/random` |
| **Random Fox API** | Get random fox images. | `https://randomfox.ca/floof/` |
| **Cat Fact API** | Get a random cat fact. | `https://catfact.ninja/fact` |
| **PlaceKitten API** | Placeholder kitten images. | `https://placekitten.com/200/300` |
| **Shibe.online API** | Random shiba inu, cat, or bird images. | `https://shibe.online/api/shibes?count=1` |
| **FishWatch API** | Sustainable seafood data. | `https://www.fishwatch.gov/api/species` |
| **Animal Crossing API** | Animal Crossing data. | `https://acnhapi.com/v1/fish/1` |
| **Bird API** | Bird facts and images. | `https://xeno-canto.org/api/2/recordings?query=parus+major` |

---

### **Utility & Productivity**
| API | Description | Example Endpoint |
|------|------------|-----------------|
| **Advice Slip API** | Get random life advice. | `https://api.adviceslip.com/advice` |
| **Bored API** | Get random activity suggestions. | `https://www.boredapi.com/api/activity` |
| **Weather API** | Get weather data (needs API key). | `https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true` |
| **IP Geolocation API** | Get geolocation by IP. | `https://ipapi.co/json/` |
| **Currency Converter API** | Convert currencies. | `https://api.exchangerate-api.com/v4/latest/USD` |
| **Holiday API** | Get holiday data. | `https://date.nager.at/api/v3/PublicHolidays/2023/US` |
| **Time Zone API** | Get time zone data. | `https://worldtimeapi.org/api/timezone/Europe/London` |
| **QR Code API** | Generate QR codes. | `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HelloWorld` |
| **URL Shortener API** | Shorten URLs. | `https://is.gd/create.php?format=json&url=https://example.com` |
| **Text-to-Speech API** | Convert text to speech. | `https://api.voicerss.org/?key=YOUR_API_KEY&src=Hello%20World&hl=en-us` |

---

### **Development & Testing**
| API | Description | Example Endpoint |
|------|------------|-----------------|
| **JSONPlaceholder** | Fake REST API for testing. | `https://jsonplaceholder.typicode.com/posts` |
| **Reqres** | Test API for frontend development. | `https://reqres.in/api/users/2` |
| **Mockaroo** | Generate mock data. | `https://api.mockaroo.com/api/generate.json?key=YOUR_API_KEY` |
| **HTTPBin** | Test HTTP requests. | `https://httpbin.org/get` |
| **Postman Echo** | Test API requests. | `https://postman-echo.com/get` |
| **Lorem Picsum** | Random placeholder images. | `https://picsum.photos/200/300` |
| **Random Data API** | Generate random data. | `https://random-data-api.com/api/v2/users` |

---

## 📌 **How to Use These APIs**
You can fetch data from these APIs using JavaScript:  

```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // View in console
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Example: Fetch a random joke
fetchData("https://v2.jokeapi.dev/joke/Any?type=single");
```

---

## 📌 **README Template**

```markdown
# Free APIs Collection 🚀

A curated list of free APIs for various purposes, including entertainment, productivity, animals, and more. Use these APIs to build fun projects, test your skills, or explore new ideas!

---

## Categories
1. **General APIs**
2. **Entertainment & Fun**
3. **Animals & Nature**
4. **Utility & Productivity**
5. **Development & Testing**

---

## How to Use
1. Copy the example endpoint.
2. Use `fetch` in JavaScript or any HTTP client to retrieve data.
3. Explore the API documentation for more options.

---

## Example Code
```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Fetch a random joke
fetchData("https://v2.jokeapi.dev/joke/Any?type=single");
```

---

## Contributing
Feel free to add more APIs to this list! Submit a pull request or open an issue.

---

## License
This project is open-source and available under the [MIT License](LICENSE).
```
