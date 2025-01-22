import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";


import Homepage from "./pages/Homepage";
import Article from "./pages/Article";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";
import Sponsers from "./pages/Sponsers";
import RealAleFestival from "./pages/RealAleFestival";

// Apollo client
const client = new ApolloClient({
  uri: "https://warwickunirealale.containers.uwcs.co.uk/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
      <Router>
        <ApolloProvider client={client}>
          <div>
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route path="/blogs/:id" element={<Article />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blogs/charity" element={<Blog initialFilters={ { title: '', categories: [4] } }/>} />
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
