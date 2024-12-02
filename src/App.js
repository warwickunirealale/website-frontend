import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";


import Homepage from "./pages/Homepage";
import Article from "./pages/Article";
import AboutUs from "./pages/AboutUs";
import Header from "./components/Header";
import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";
import Sponsers from "./pages/Sponsers";
import RealAleFestival from "./pages/RealAleFestival";

// Apollo client
const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
      <Router>
        <ApolloProvider client={client}>
          <div>
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route path="/articles/:id" element={<Article />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/sponsers" element={<Sponsers />} />
              <Route path="/real-ale-festival" element={<RealAleFestival />} />
            </Routes>
          </div>
        </ApolloProvider>
      </Router>
  );
}

export default App;
