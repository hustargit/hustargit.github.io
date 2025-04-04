// 确保加载动画一直显示
document.addEventListener('DOMContentLoaded', function() {
  // 移除原来的load事件监听器（通过替换loader元素实现）
  const originalLoader = document.querySelector('.page-loader');
  if (originalLoader) {
    const newLoader = originalLoader.cloneNode(true);
    originalLoader.parentNode.replaceChild(newLoader, originalLoader);
    
    // 确保加载动画可见
    newLoader.style.display = 'flex';
    newLoader.style.opacity = '1';
    newLoader.style.visibility = 'visible';
    newLoader.style.zIndex = '10000';
    
    // 添加自定义点击事件
    newLoader.addEventListener('click', function() {
      this.classList.add('hidden');
      setTimeout(() => {
        this.style.display = 'none';
      }, 500);
    });
    
    // 添加提示信息
    const hint = document.createElement('p');
    hint.textContent = '点击任意位置关闭加载动画';
    hint.style.color = 'white';
    hint.style.marginTop = '20px';
    hint.style.fontSize = '0.8em';
    newLoader.appendChild(hint);
    
    console.log('加载动画已修复，现在可以点击关闭');
  }
});
