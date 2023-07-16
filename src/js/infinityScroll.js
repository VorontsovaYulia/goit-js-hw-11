export {infinityScroll}
function infinityScroll(page) {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement
  
  if (scrollTop + clientHeight >= scrollHeight - 5) {
      return true; 
   }
 }