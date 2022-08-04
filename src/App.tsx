import './App.sass'
import Navbar from 'components/Navbar'
import PaintingsList from 'components/PaintingsList'
import Filters from 'components/Filters'
import Pagination from 'components/Pagination'

function App() {
  return (
    <div className="container">
      <Navbar />
      <Filters />
      <PaintingsList />
      <Pagination />
    </div>
  )
}

export default App
