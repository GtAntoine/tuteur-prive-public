// src/lib/utils/scroll.ts
export function scrollToElement(element: HTMLElement | null, offset: number = 0) {
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}
