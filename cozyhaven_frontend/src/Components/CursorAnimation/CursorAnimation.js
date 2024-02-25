

export const CursorAnimation = () => {
  // Event listeners for cursor movement
  const cursor = document.querySelector("#cursor");
  const blur = document.querySelector("#cursor-blur");
  
  document.addEventListener("mousemove", function (event) {
    blur.style.left = event.clientX - 250 + "px";
    blur.style.top = event.clientY - 250 + "px";
  });

};
