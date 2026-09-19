import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";

// Define the router configuration by creating an array of route objects
const appRouter = createBrowserRouter([
  {
    path: "/", // The root URL (homepage)
    element: <Home />, // Renders the Home component when the user visits "/"
  },
  {
    path: "/login", // The /login URL
    element: <Login />, // Renders the Login component when the user visits "/login"
  },
  {
    path: "/signup", // The /signup URL
    element: <Signup />, // Renders the Signup component when the user visits "/signup"
  },
  {
    path: "/jobs", // The /jobs URL
    element: <Jobs /> // Renders the Jobs component when the user visits "/jobs"
  }
]);

// The main App component that acts as the root of our application
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
