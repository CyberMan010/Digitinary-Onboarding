// // LandingPage.tsx

// import "../styles/landingpage.scss"
// const LandingPage = () => {


//   return (
//     <div className="landing-container">
//       <div className="header">
//         <h1>I am a
//         </h1>
//       </div>

//       <div className="slider-container">
//         <button className="navigation-button prev" onClick={handlePrev}>
//           ←
//         </button>

//         <div className="slider">
//           <div
//             className="slider-content"
//             style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//           >
//             {groupedCards.map((pair, index) => (
//               <div key={index} className="slide">
//                 {pair.map((card) => (
//                   <div key={card.id} className="slide-half">
//                     {card.component}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>

//         <button className="navigation-button next" onClick={handleNext}>
//           →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;