const child = document.querySelector('.child');

// callback func
const cb = (entries, observer) => {
  // alert('intersecting');
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 要素が入った場合
      console.log('in');
      observer.unobserve(entry.target); // 監視をやめる entry.target = child の dom
    } else {
      console.log('out');
    }
  });
};

const io = new IntersectionObserver(cb);
io.observe(child); // 要素の登録
