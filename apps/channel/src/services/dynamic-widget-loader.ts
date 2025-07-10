// Динамический загрузчик виджетов без hard dependencies
export async function loadWidgetDynamically(remoteUrl: string, componentName: string) {
  try {
    console.log('Loading widget:', { remoteUrl, componentName });
    
    // Извлекаем имя remote и URL из конфигурации
    const [remoteName, url] = remoteUrl.split('@');
    console.log('Parsed remote:', { remoteName, url });
    
    // Динамически загружаем remote entry
    const container = await loadRemoteContainer(remoteName, url);
    console.log('Container loaded:', container);
    
    // Получаем модуль с компонентом
    const module = await container.get(componentName);
    console.log('Module loaded:', module);
    
    // Вызываем factory функцию для получения компонента
    const Component = module();
    console.log('Component created:', Component);
    
    return Component.default || Component;
  } catch (error) {
    console.error('Error in loadWidgetDynamically:', error);
    throw new Error(`Failed to load widget from ${remoteUrl}: ${error}`);
  }
}

// Функция для загрузки remote container
async function loadRemoteContainer(remoteName: string, remoteUrl: string) {
  console.log('Loading remote container:', { remoteName, remoteUrl });
  
  // Проверяем, не загружен ли уже этот remote
  if ((window as any)[remoteName]) {
    console.log('Remote already loaded:', remoteName);
    return (window as any)[remoteName];
  }
  
  // Загружаем remote entry script
  console.log('Loading script:', remoteUrl);
  await loadScript(remoteUrl);
  
  // Получаем container из глобального объекта
  const container = (window as any)[remoteName];
  console.log('Container from window:', container);
  
  if (!container) {
    throw new Error(`Remote container not found for ${remoteName}`);
  }
  
  return container;
}

// Функция для загрузки script
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log('Loading script:', src);
    
    // Проверяем, не загружен ли уже этот script
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      console.log('Script already loaded:', src);
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      console.log('Script loaded successfully:', src);
      resolve();
    };
    script.onerror = (error) => {
      console.error('Script load error:', src, error);
      reject(new Error(`Failed to load script: ${src}`));
    };
    document.head.appendChild(script);
  });
} 