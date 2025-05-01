import { useRoutes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import routes from "./routes.jsx"


 const App = () =>{

  let element = useRoutes(routes);

  return(
    <>
      {element}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </>
  )
}
export default App;