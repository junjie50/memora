//github main's
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.js';
import Test from './pages/Test.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}


//我的原先的
// import BookingPageNotLoggedIn from './pages/BookingPageNotLoggedIn.js';
// // import BookingConfirmed from './pages/BookingConfirmed.js';

// function App() {
//   return (
//     <div className="container">
//       <BookingPageNotLoggedIn />
//       {/* <BookingConfirmed /> */}
//     </div>
//   );
// }

export default App;

/*

Padding:
https://blog.csdn.net/u013179804/article/details/137834770?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522171947364816800227426230%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=171947364816800227426230&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-137834770-null-null.142^v100^pc_search_result_base5&utm_term=padding&spm=1018.2226.3001.4187

problem：
inter 字体确认怎么改
*/