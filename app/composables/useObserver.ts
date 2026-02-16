export function useObserver() {
  let intersectionObserver: IntersectionObserver | null = null;
  let mutationObserver: MutationObserver | null = null;

  function observeElements() {
    if (!import.meta.client) return;

    cleanup();

    intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-element');
          entry.target.classList.remove('hidden-element');
          intersectionObserver?.unobserve(entry.target);
        }
      });
    });

    mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type !== 'childList') return;

        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;

          const el = node as Element;
          if (el.classList.contains('hidden-element')) {
            intersectionObserver?.observe(el);
          }

          el.querySelectorAll('.hidden-element').forEach((nestedNode) => {
            intersectionObserver?.observe(nestedNode);
          });
        });
      });
    });

    document.querySelectorAll('.hidden-element').forEach((element) => {
      intersectionObserver!.observe(element);
    });

    const main = document.querySelector('.main-content');
    if (main) {
      mutationObserver.observe(main, { childList: true, subtree: true });
    }
  }

  function cleanup() {
    intersectionObserver?.disconnect();
    mutationObserver?.disconnect();
    intersectionObserver = null;
    mutationObserver = null;
  }

  onMounted(() => {
    observeElements();
  });

  onBeforeUnmount(() => {
    cleanup();
  });

  return { observeElements, cleanup };
}
