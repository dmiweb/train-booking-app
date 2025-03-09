import "./ScrollPageTopButton.css";

const ScrollPageTopButton = () => {
  const handleScrollButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  }

  return (
    <button type="button" className="scroll-btn" onClick={handleScrollButton}></button>
  );
}

export default ScrollPageTopButton;